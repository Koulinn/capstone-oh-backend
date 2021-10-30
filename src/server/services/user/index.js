import express from "express"
import multer from 'multer'
import userHandlers from "./user_handlers.js"
import lib from '../../../lib/index.js'
import validations from "./user-validations.js"
import JWTAuthMiddleware from "../../../lib/auth/jwt-middle.js"
import passport from "passport"
import { saveUserMedicalRequestFiles, saveUserAvatar } from "../../../lib/services_aux/cloud_storage.js"

const { userValidator } = validations
const { tools } = lib
const { checkSchemaErrors, isLoggedUser, createPreDefinedUser, checkExistentEmail } = tools


const router = express.Router()

const { create, getMe, updateMe, login, refreshLogin, 
  OauthRedirect, bookMedicalRequest, uploadAvatar, searchResults, getMyResults } = userHandlers

router
  .route("/")
  .post(userValidator, checkSchemaErrors, create)
router
  .route("/me")
  .get(JWTAuthMiddleware, getMe)
  .put(JWTAuthMiddleware, updateMe)
  router
  .route("/me/results")
  .get(JWTAuthMiddleware, getMyResults)

router
  .route("/me/searchResults")
  .get(JWTAuthMiddleware, searchResults)

router
  .route("/me/uploadAvatar")
  .put(JWTAuthMiddleware, multer({ storage: saveUserAvatar }).single('avatar'), uploadAvatar)

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
  .route("/googleOauth")
  .get(passport.authenticate("google"), OauthRedirect)
router
  .route("/bookTest")
  .post(
    multer({ storage: saveUserMedicalRequestFiles }).fields([{ name: 'medicalRequestsImgs', maxCount: 10 }]),
    isLoggedUser,
    checkExistentEmail,
    createPreDefinedUser,
    bookMedicalRequest
  )

export default router
