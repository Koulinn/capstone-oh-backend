import express from "express"
import multer from 'multer'
import hospital from './hospital-handlers.js'

const{ addNewTest, confirmUserTests, addResult} = hospital

const router = express.Router()
  
router
  .route("/")
  .post(addNewTest)
router
  .route("/addResult/:requestID")
  .put(addResult)

router
  .route("/:requestID")
  .put(confirmUserTests)



export default router
