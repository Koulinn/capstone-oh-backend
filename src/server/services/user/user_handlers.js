import UserModel from '../../../db/Schemas/User.js'
import lib from '../../../lib/index.js'
import createError from "http-errors";
import { generateTokens, refreshToken } from '../../../lib/auth/jwt-aux.js';
import Medical_Request from '../../../db/Schemas/Medical_Request.js';


const { tools } = lib

const create = async (req, res, next) => {
  try {
    const { years, months } = tools.getPreciseAge(req.body.birth_date)
    req.body.age = {}
    req.body.age.age_years = years
    req.body.age.age_months = months

    const newUser = new UserModel(req.body)
    const savedUser = await newUser.save({ new: true })
    const { accessToken, newRefreshToken } = await generateTokens(savedUser)
    res.status(201).send({ success: true, accessToken, newRefreshToken })

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
      const { accessToken, newRefreshToken } = await generateTokens(user)
      res.status(200).send({ success: true, accessToken, newRefreshToken })
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

    res.send({ success: true, accessToken, newRefreshToken })
  } catch (error) {
    next(error)
  }
}

const OauthRedirect = async (req, res, next) => {
  try {
    res.redirect(`http://localhost:3000?accessToken=${req.user.tokens.accessToken}&refreshToken=${req.user.tokens.newRefreshToken}`)
  } catch (error) {
    next(error)
  }
}


const bookMedicalRequest = async (req, res, next) => {
  try {
    console.log('inside bookmedical request')
    const userMedTestList = tools.createUserMedTestsList(req)
    const availability  = await tools.definedUserAvailability(req.body.userAvailability)
    const userID = req.user._id.toString()
   
    const medicalRequestObj = {
      userID: userID,
      user_tests_requested: userMedTestList,
      user_availability: availability
    }

    const newUserRequest =  new Medical_Request(medicalRequestObj)
    const savedRequest = await newUserRequest.save({ new: true })
    console.log(savedRequest)
    

    res.status(201).send(savedRequest)
  } catch (error) {
    next(error)
  }
}




const userHandlers = {
  create: create,
  getMe: getMe,
  updateMe: updateMe,
  login: login,
  refreshLogin: refreshLogin,
  OauthRedirect: OauthRedirect,
  bookMedicalRequest: bookMedicalRequest,

}

export default userHandlers