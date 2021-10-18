import express from "express"
import multer from 'multer'
import userHandlers from "./user_handlers.js"
import lib from '../../../lib/index.js'
import validations from "./user-validations.js"
import JWTAuthMiddleware from "../../../lib/auth/jwt-middle.js"
import passport from "passport"

const { userValidator } = validations
const { tools } = lib
const { checkSchemaErrors } = tools


const router = express.Router()

const { create, getMe, login, refreshLogin, OauthRedirect } = userHandlers

router
  .route("/")
  .post(userValidator, checkSchemaErrors, create)
router
  .route("/me")
  .get(JWTAuthMiddleware, getMe)
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

export default router
