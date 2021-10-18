import express from "express"
import multer from 'multer'
import userHandlers from "./user_handlers.js"


const router = express.Router()

const {create} = userHandlers
  
router
  .route("/")
  .post(create)



export default router
