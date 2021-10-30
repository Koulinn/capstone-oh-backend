import GoogleStrategy from 'passport-google-oauth20'
import passport from 'passport'
import UserModel from '../../../db/Schemas/User.js'
import { generateTokens } from '../jwt-aux.js'


const googleStrategyConfig = {
    clientID: process.env.GOOGLE_API_OAUTH_ID,
    clientSecret: process.env.GOOGLE_API_SECRET_KEY,
    callbackURL: process.env.BE_URL + process.env.PORT + '/user/googleOauth',
}

export const googleStrategy = new GoogleStrategy(
    googleStrategyConfig
,
    async (accessToken, refreshToken, profile, passportNext) => {
        try {
          const user = await UserModel.findOne({ email: profile._json.email })
          if (user) {
            const tokens = await generateTokens(user)
            passportNext(null, { tokens })
          } else {
            const newUser = {
              name: profile._json.given_name,
              surname: profile._json.family_name,
              email: profile._json.email,
              avatar: profile._json.picture,
              googleId: profile.id,
              phone_primary: '7895144568'
            }
    
            const createdUser = new UserModel(newUser)
            await createdUser.save()
            const savedUser = await createdUser.save()
            const tokens = await generateTokens(savedUser)
    
            passportNext(null, { tokens })
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