import lib from "../lib/index.js"
import cors from "cors"
import server from '../index.js'
import connectToDB from '../DB/conn/index.js'
import passport from "passport"
import { createServer } from 'http';
import express  from "express"
import examRouter from './services/exam/index.js'
import errorHandlers from "./server_aux/error_handlers.js"



export const httpServer = createServer(server)

const {corsConfig} = lib


server.use(express.json())
// passport.use("google", GoogleStrategy)
server.use(cors(corsConfig))
server.use(passport.initialize())

server.use("/exam", examRouter)




server.use(errorHandlers.forbidden)
server.use(errorHandlers.notFound)
server.use(errorHandlers.badRequest)
server.use(errorHandlers.unauthorizedHandler)
server.use(errorHandlers.server)




if((process.env.MONGO_DEV_URL) || (process.env.MONGO_PROD_URL)){

httpServer.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`)
})
    connectToDB()
    server.on("error", (error) =>
        console.log("🚀 Server is crashed due to ", error)
    )
} 
