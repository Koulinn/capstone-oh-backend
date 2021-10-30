import express from "express"
import multer from 'multer'
import hospital from './hospital-handlers.js'

const{ addNewTest, confirmUserTests, addResult, addAssistant, getAssistant, searchTest} = hospital

const router = express.Router()
  
router
  .route("/")
  .post(addNewTest)
  .get(searchTest)
  router
  .route("/addResult/:requestID")
  .put(addResult)
router
  .route("/assistants")
  .post(addAssistant)
  .get(getAssistant)

router
  .route("/:requestID")
  .put(confirmUserTests)



export default router
