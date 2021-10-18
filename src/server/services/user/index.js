import express from "express"
import multer from 'multer'
import userHandlers from "./user_handlers.js"
import lib from '../../../lib/index.js'
import validations from "./user-validations.js"

const {userValidator} =validations
const {tools} = lib
const {checkSchemaErrors} = tools


const router = express.Router()

const {create, getMe} = userHandlers
  
router
  .route("/")
  .post(userValidator, checkSchemaErrors, create)
router  
  .route("/me")
  .get(getMe)



export default router
