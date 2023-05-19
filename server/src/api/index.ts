import axios from "axios";
import express, { Request, Response, NextFunction } from "express";
import type { Giphy, Data } from "../types/Giphy"
import { GIPHY_API_KEY } from '../config/config'
import { db } from '../database/database'
import { validate as uuidValidate } from 'uuid';

db.init()

const router = express.Router()

// Get user ID
//`SELECT id FROM client WHERE email = 'john@doe.com' AND password = '1234' LIMIT 1;`
//`SELECT id FROM client limit 1;` // select first userid
// Select

const ping = async (req: Request, res: Response, next: NextFunction ) => {
  res.status(200).send({ping: 'success' })
}
router.get("/api/ping", (req: Request, res: Response, next: NextFunction)=>{
  return ping(req, res, next)
  .catch(err => {
    return res.status(500).send({ status: 500, message: err.message })
  })
})

const giphySearch = async (req: Request, res: Response, next: NextFunction ) => {
  // const resource = req.params.resource
  // if (!resource || resource != 'giphy')
      // res.status(400).send({error: 'Invalid resource'})
  const q = req.query.q
  if (!q)
    res.status(400).send({error: 'Missing query'})
  const giphySearchRes = await axios({
    method: 'GET',
    url:`https://api.giphy.com/v1/gifs/search?offset=0&q=${q}&api_key=${GIPHY_API_KEY}&limit=10`,
  })
  res.status(giphySearchRes.status).send(giphySearchRes.data)
}
// router.get("/api/:resource", (req: Request, res: Response, next: NextFunction)=>{ // conflict with api/login
router.get("/api/giphy", (req: Request, res: Response, next: NextFunction)=>{
  return giphySearch(req, res, next)
  .catch(err => {
    return res.status(500).send({ status: 500, message: err.message })
  })
})

const loginPost = async (req: Request, res: Response, next: NextFunction ) => {
  const email = req.body.email
  if(!email || !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email))
    return res.status(400).send({error: 'Invalid email'})
  const password = req.body.password
  if (!password)
    return res.status(400).send({error: 'Invalid password'})
  const query = {
    name: 'fetch user', // makes a prepared statement(cache)
    text: `SELECT id FROM client WHERE email = $1 AND password = $2 LIMIT 1;`,
    values: [email, password]
  }
  const results = await db.client.query(query)
  const id = results.rowCount ? results.rows[0].id: '' 
  return res.status(200).send({id})
}
router.post("/api/login", (req: Request, res: Response, next: NextFunction)=>{
  return loginPost(req, res, next)
  .catch(err => {
    return res.status(500).send({ status: 500, message: err.message })
  })
})


const favoritesPost = async (req: Request, res: Response, next: NextFunction ) => {
  const user_id = req.body.user_id || req.headers.user_id
  if(!user_id || !uuidValidate(user_id as string))
    return res.status(400).send({error: 'Invalid user_id'})
  const url = req.body.url
  if (!url)
    return res.status(400).send({error: 'Invalid url'})
  const query = {
    name: 'save favorite', // makes a prepared statement(cache)
    text: `INSERT INTO favorite(user_id, url) VALUES($1, $2) RETURNING *;`,
    values: [user_id, url]
  }
  const results = await db.client.query(query)
  return res.status(200).send({success: true, rows: results.rows})
}
router.post("/api/favorites", (req: Request, res: Response, next: NextFunction)=>{
  return favoritesPost(req, res, next)
  .catch(err => {
    return res.status(500).send({ status: 500, message: err.message })
  })
})

const favoritesGet = async (req: Request, res: Response, next: NextFunction ) => {
  const user_id = req.headers.user_id
  if(!user_id || !uuidValidate(user_id as string))
    return res.status(400).send({error: 'Invalid header user_id'})
  const query = {
    name: 'fetch favorites from user', // makes a prepared statement(cache)
    text: `SELECT id, url FROM favorite WHERE user_id = $1;`,
    values: [user_id]
  }
  const results = await db.client.query(query)
  return res.status(200).send({favorites: results.rows})
}
router.get("/api/favorites", (req: Request, res: Response, next: NextFunction)=>{
  return favoritesGet(req, res, next)
  .catch(err => {
    return res.status(500).send({ status: 500, message: err.message })
  })
})

const favoritesDelete = async (req: Request, res: Response, next: NextFunction ) => {
  const user_id = req.body.user_id || req.headers.user_id
  if(!user_id || !uuidValidate(user_id as string))
    return res.status(400).send({error: 'Invalid user_id'})
  const id = req.body.id
  if(!id || !uuidValidate(id as string))
    return res.status(400).send({error: 'Invalid id'})
  const url = req.body.url
  if (!url)
    return res.status(400).send({error: 'Invalid url'})
  const query = {
    name: 'delete favorite', // makes a prepared statement(cache)
    text: `DELETE FROM favorite WHERE id = $1 OR url = $2;`,
    values: [id, url]
  }
  const results = await db.client.query(query)
  return res.status(200).send({success: true})
}
router.delete("/api/favorites", (req: Request, res: Response, next: NextFunction)=>{
  return favoritesDelete(req, res, next)
  .catch(err => {
    return res.status(500).send({ status: 500, message: err.message })
  })
})

export default router;
