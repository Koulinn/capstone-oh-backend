import GoogleStrategy from 'passport-google-oauth20'
import passport from 'passport'
import UserModel from '../../../db/Schemas/User.js'
import { generateTokens } from '../jwt-aux.js'

const BACKEND_URL_PROD = process.env.PROD_BACKEND_URL
const BACKEND_URL_DEV = process.env.BE_URL + process.env.PORT

const CALL_BACK_URL =  process.env.NODE_ENV === 'production'? BACKEND_URL_PROD : BACKEND_URL_DEV


const googleStrategyConfig = {
    clientID: process.env.GOOGLE_API_OAUTH_ID,
    clientSecret: process.env.GOOGLE_API_SECRET_KEY,
    callbackURL: CALL_BACK_URL + '/user/googleOauth',
}

export const googleStrategy = new GoogleStrategy(
    googleStrategyConfig
,
    async (accessToken, refreshToken, profile, passportNext) => {
        try {
          const user = await UserModel.findOne({ email: profile._json.email })
          if (user) {
            const tokens = await generateTokens(user)
            passportNext(null, { user,tokens, })
          } else {
            const newUser = {
              name: profile._json.given_name,
              surname: profile._json.family_name,
              email: profile._json.email,
              avatar: profile._json.picture || ('https://ui-avatars.com/api/?name=' + profile._json.given_name) ,
              googleId: profile.id,
              phone_primary: 'false'
            }
    
            const createdUser = new UserModel(newUser)
            await createdUser.save()
            const savedUser = await createdUser.save()
            const tokens = await generateTokens(savedUser)
    
            passportNext(null, { tokens, user:savedUser })
          }
        } catch (error) {
          passportNext(error)
        }
      }
    
    
)


passport.serializeUser(function (user, passportNext) {
  passportNext(null, user)
})

export default googleStrategy