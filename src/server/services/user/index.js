import express from "express"
import multer from 'multer'
import userHandlers from "./user_handlers.js"
import lib from '../../../lib/index.js'
import validations from "./user-validations.js"
import JWTAuthMiddleware from "../../../lib/auth/jwt-middle.js"
import passport from "passport"
import { saveUserMedicalRequestFiles } from "../../../lib/services_aux/cloud_storage.js"

const { userValidator } = validations
const { tools } = lib
const { checkSchemaErrors, isRegisteredUser, createPreDefinedUser, checkExistentEmail } = tools


const router = express.Router()

const { create, getMe, updateMe, login, refreshLogin, OauthRedirect, bookMedicalRequest } = userHandlers

router
  .route("/")
  .post(userValidator, checkSchemaErrors, create)
router
  .route("/me")
  .get(JWTAuthMiddleware, getMe)
  .put(JWTAuthMiddleware, updateMe)
router
  .route("/login")
  .post(login)
router
  .route("/refreshToken")
  .post(refreshLogin)

router
  .route("/googleLogin")
  .get(passport.authenticate('google', { scope: ["profile", 'email'] }))

router
  .route("/googleOauthRedirect")
  .get(passport.authenticate("google"), OauthRedirect)
router
  .route("/bookTest")
  .post(
    multer({ storage: saveUserMedicalRequestFiles }).fields([{ name: 'medicalRequestsImgs', maxCount: 10 }]),
    isRegisteredUser,
    checkExistentEmail,
    createPreDefinedUser,
    bookMedicalRequest
  )

export default router
