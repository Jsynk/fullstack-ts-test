import { runInAction, makeAutoObservable, observable } from "mobx";
import type { Giphy, Data } from "../types/Giphy"
import * as mockGiphyApiResponse from "../mocks/giphy.json"

const giphyJSON = mockGiphyApiResponse as unknown as Giphy

export type Favorite = {
  id: string
  user_id: string
  url: string
}

class Image {
  id: string
  user_id: string
  url: string
  isFav: boolean
  isUpdating: boolean
  constructor(id: string, user_id: string, url: string, isFav: boolean) {
      this.id = id
      this.user_id = user_id
      this.url = url
      this.isFav = isFav
      this.isUpdating = false
  }
  static FromFav(f: Favorite){
    return new Image(f.id, f.user_id, f.url, true)
  }
  static FromData(d: Data){
    return new Image('', '', d.images.fixed_width.url, false)
  }
}

class ApplicationStore {
  userId: string = ''
  images: Image[] = []
  favorites: Image[] = []
  search: string = ''
  searchValid: boolean = false
  mockApi = false
  loading = true

  constructor() {
    makeAutoObservable(
      this,
      {
        userId: observable,
        images: observable,
        favorites: observable,
        search: observable,
        searchValid: observable,
        mockApi: observable,
        loading: observable,
      },
      { autoBind: true }
    );
    this.init()
    .catch(err=>{console.error(err)})
  }

  async init() {
    const loginRes = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        "email": "john@doe.com",
        "password": "1234"
      }), 
      headers: {
        "Content-Type": "application/json",
      },
    })
    const loginResJSON = await loginRes.json()
    this.userId = loginResJSON.id
    const res = await fetch(`/api/favorites`, {
      headers: {
        user_id: this.userId
      }
    })
    const resJson = await res.json()
    const images = resJson.favorites.map((f: Favorite)=> Image.FromFav(f))
    this.favorites = images
    this.loading = false
  }

  async toggleFavorite(image: Image) {
    if(!image.isUpdating) {
      image.isUpdating = true
      try {
        if(!image.isFav) {
          await this.addFavorite(image)
        } else {
          await this.delFavorite(image)
        }
      } catch (err) {
        console.error(err)
      }
    }
  }

  async addFavorite(image: Image) {
    const addFavRes = await fetch('/api/favorites', {
      method: 'POST',
      body: JSON.stringify({
        "user_id": this.userId,
        "url": image.url,
      }), 
      headers: {
        "Content-Type": "application/json",
      },
    })
    const addFavResJSON = await addFavRes.json()
    let resFavRow = Image.FromFav(addFavResJSON.rows[0] as Favorite)
    runInAction(()=>{ 
      this.favorites.push(resFavRow)
      const imageIndex = this.images.findIndex((i:Image)=>i.url===image.url)
      if(imageIndex !== -1) {
        let images = JSON.parse(JSON.stringify(this.images))
        images[imageIndex].isFav = true
        images[imageIndex].id = resFavRow.id
        images[imageIndex].isUpdating = false
        this.images = images
      }
    })
  }

  async delFavorite(image: Image) {
    if (!image.id || !this.userId) return
    const delFavRes = await fetch('/api/favorites', {
      method: 'DELETE',
      body: JSON.stringify({
        "id": image.id,
        "user_id": this.userId,
        "url": image.url,
      }), 
      headers: {
        "Content-Type": "application/json",
      },
    })
    const delFavResJSON = await delFavRes.json()
    if(delFavResJSON.success) {
      const delIndex = this.favorites.findIndex((i:Image)=>i.id===image.id)
      if(delIndex !== -1) {
        runInAction(()=>{
          const newFavorites = this.favorites.slice(0, delIndex).concat(this.favorites.slice(delIndex+1))
          this.favorites = newFavorites

          const imageIndex = this.images.findIndex((i:Image)=>i.url===image.url)
          if(imageIndex !== -1) {
            let images = JSON.parse(JSON.stringify(this.images))
            images[imageIndex].isFav = false
            images[imageIndex].isUpdating = false
            this.images = images
          }
        })
      }
    }
  }

  async getSearch() {
    if (!this.mockApi) {
      const res = await fetch(`/api/giphy?q=${this.search}`)
      const resJson = await res.json()
      this.setImages(resJson)
    } else {
      this.setImages(giphyJSON)
    }
  }

  setSearch(search: string) {
    this.search = search
    this.searchValid = search ? true : false
  }

  async getImages() {
    if (!this.mockApi) {
      const res = await fetch(`/api/giphy?q=${this.search}`)
      const resJson = await res.json()
      this.setImages(resJson)
    } else {
      this.setImages(giphyJSON)
    }
  }
  
  setImages(gifs: Giphy) {
    const { data } = gifs
    let images = data.map(d=>Image.FromData(d))
    images.forEach(image=>{
      const fav = this.favorites.find((i:Image)=>i.url===image.url)
      if(fav) {
        image.isFav = true
        image.id = fav.id
        image.user_id = fav.user_id
      }
    })
    this.images = images
  }
}

const store = new ApplicationStore();

export { store };
