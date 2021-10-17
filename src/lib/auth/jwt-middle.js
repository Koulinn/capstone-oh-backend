import createHttpError from "http-errors"
import { verifyJWT } from "./jwt-aux.js"
import User from "../db/models/User.js"

export const JWTAuthMiddleware = async (req, res, next) => {

  if (!req.headers.authorization) {
    next(createHttpError(401, "Please provide credentials in Authorization header!"))
  } else {
    try {
            
      const token = req.headers.authorization.replace("Bearer ", "")
      console.log(token)

      const decodedToken = await verifyJWT(token)
      console.log(decodedToken, 'decoded token')

      const user = await User.findById(decodedToken._id)
    

      if (user) {
        // user
        req.user = user
        
        next()
      } else {
        next(createHttpError(404, "User not found!"))
      }
    } catch (error) {
      // console.log(req.headers)
      next(createHttpError(401, "Token not valid!"))
    }
  }
}