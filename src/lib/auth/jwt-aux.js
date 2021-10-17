import jwt from "jsonwebtoken"
import createHttpError from "http-errors"
import PersonModel from '../../db/Schemas/Person.js'

export const JWTAuthenticate = async (user) => {
    const accessToken = await generateJWT({ _id: user._id })
    const refreshToken = await generateRefreshedJWT({ _id: user._id })
  
    user.refreshToken = refreshToken
  
    await user.save()
    return { accessToken, refreshToken }

}

const generateRefreshedJWT = (payload) =>
  new Promise((resolve, reject) =>
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" }, (err, token) => {
      if (err) reject(err)
      resolve(token)
    })
  )

  const generateJWT = payload =>
  new Promise((resolve, reject) =>
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" }, (err, token) => {
      if (err) reject(err)
      resolve(token)
    })
  )


export const verifyJWT = (token) =>
  new Promise((resolve, reject) =>
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) reject(err)
      resolve(decodedToken)
    })
  )

  const verifyRefreshJWT = token =>
  new Promise((resolve, reject) =>
    jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, decodedToken) => {
      if (err) reject(err)
      resolve(decodedToken)
    })
  )

  export const refreshTokens = async actualRefreshToken => {
  
    const decodedRefreshToken = await verifyRefreshJWT(actualRefreshToken)
    const user = await PersonModel.findById(decodedRefreshToken._id)
  
    if (!user) throw new Error("User not found!")
  
    if (user.refreshToken === actualRefreshToken) {
      const { accessToken, refreshToken } = await JWTAuthenticate(user)
    //  user.refresh.= refreshToken
    //  user.save()
      return { accessToken, refreshToken }
    } else {
      throw createHttpError(401, "Refresh Token not valid!")
    }
  }