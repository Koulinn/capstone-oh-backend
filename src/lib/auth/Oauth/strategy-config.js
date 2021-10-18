import GoogleStrategy from 'passport-google-oauth20'
import passport from 'passport'
import PersonModel from '../../../db/Schemas/Person.js'
import { JWTAuthenticate } from '../jwt-aux.js'


const googleStrategyConfig = {
    clientID: process.env.GOOGLE_API_OAUTH_ID,
    clientSecret: process.env.GOOGLE_API_SECRET_KEY,
    callbackURL: process.env.BE_URL + process.env.PORT + '/user/googleRedirect',
}

export const googleStrategy = new GoogleStrategy(
    googleStrategyConfig
,
    async (accessToken, refreshToken, profile, passportNext) => {
        try {
          console.log(profile)
    
          const user = await PersonModel.findOne({ googleId: profile.id })
    
          if (user) {
            const tokens = await JWTAuthenticate(user)
            passportNext(null, { tokens })

          } else {
            const newUser = {
              name: profile.name.givenName,
              surname: profile.name.familyName,
              email: profile.emails[0].value,
              role: "User",
              googleId: profile.id,
            }
    
            const createdUser = new User(newUser)
            const savedUser = await createdUser.save()
            const tokens = await JWTAuthenticate(savedUser)
    
            passportNext(null, { user: savedUser, tokens })
          }
        } catch (error) {
          console.log(error)
          passportNext(error)
        }
      }
    
    
)


passport.serializeUser(function (user, passportNext) {
  passportNext(null, user)
})

export default googleStrategy