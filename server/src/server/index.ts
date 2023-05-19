import http from "http";
import app from "./app";
import { SERVER_PORT } from '../config/config'

const server = http.createServer(app);

server.on("error", (error: Error) => {
    console.log(`❌ Server error: ${error}`);
});

server.listen(SERVER_PORT,() => {
    console.log(`🚀 Server started on port ${SERVER_PORT}`);
});
