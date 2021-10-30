import lib from "../lib/index.js"
import cors from "cors"
import server from '../index.js'
import connectToDB from '../DB/conn/index.js'
import passport from "passport"
import { createServer } from 'http';
import express  from "express"
import userRouter from './services/user/index.js'
import hospitalRouter from './services/hospital/index.js'
import errorHandlers from "./server_aux/error_handlers.js"
import googleStrategy from "../lib/auth/Oauth/strategy-config.js"
import { connectSocket } from "./socket/index.js"



export const httpServer = createServer(server)

const {corsConfig} = lib


server.use(express.json())
passport.use("google", googleStrategy)
server.use(cors(corsConfig))
server.use(passport.initialize())

server.use("/user", userRouter)
server.use("/hospital", hospitalRouter)




server.use(errorHandlers.forbidden)
server.use(errorHandlers.notFound)
server.use(errorHandlers.badRequest)
server.use(errorHandlers.unauthorizedHandler)
server.use(errorHandlers.server)




if((process.env.MONGO_DEV_URL) || (process.env.MONGO_PROD_URL)){

httpServer.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`)
})
    connectSocket(server)
    connectToDB()
    server.on("error", (error) =>
        console.log("🚀 Server is crashed due to ", error)
    )
} 

const testServer = server

export default testServer