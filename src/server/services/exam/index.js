import express from "express"
import multer from 'multer'


const router = express.Router()
  
router
  .route("/")
  .get((req, res, next)=>{
    console.log('get')
  })



export default router
