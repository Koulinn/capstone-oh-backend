import UserModel from '../../../db/Schemas/User.js'
import lib from '../../../lib/index.js'
import createError from "http-errors";
import { generateTokens, refreshToken } from '../../../lib/auth/jwt-aux.js';


const { tools } = lib

const create = async (req, res, next) => {
  try {
    const { years, months } = tools.getPreciseAge(req.body.birth_date)
    req.body.age = {}
    req.body.age.age_years = years
    req.body.age.age_months = months

    const newUser = new UserModel(req.body)
    const savedUser = await newUser.save({ new: true })
    res.status(201).send({ success: true, new_user: savedUser })

  } catch (error) {
    console.log(error)
    next(error)
  }
}

const getMe = async (req, res, next) => {
  try {
    const { user } = req
    if (user) {
      res.status(200).send({ success: true, user })
    } else {
      res.createError(404, 'User not found')
    }
  } catch (error) {
    next(error)
  }
}

const updateMe = async (req, res, next) => {
  try {
    const userID = req.user._id
    const user = await UserModel.findByIdAndUpdate(userID, { _id: userID, ...req.body }, { new: true })
    if (user) {
      res.status(200).send({ success: true, user })
    } else {
      res.createError(404, 'User not found')
    }
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await UserModel.checkCredentials(email, password)

    if (user) {
      const { accessToken, refreshToken } = await generateTokens(user)
      res.status(200).send({ success: true, accessToken, refreshToken })
    } else {

      next(createHttpError(401, "Credentials are not ok!"))
    }
  } catch (error) {
    next(error)
  }
}

const refreshLogin = async (req, res, next) => {
  try {
    const { validRefreshToken } = req.body
    const { accessToken, newRefreshToken } = await refreshToken(validRefreshToken)

    res.send({ success:true, accessToken, newRefreshToken })
  } catch (error) {
    next(error)
  }
}

const userHandlers = {
  create: create,
  getMe: getMe,
  updateMe: updateMe,
  login: login,
  refreshLogin: refreshLogin

}

export default userHandlers