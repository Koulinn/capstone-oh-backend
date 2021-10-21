import UserModel from '../../../db/Schemas/User.js'
import Medical_Request from '../../../db/Schemas/Medical_Request.js';
import createError from "http-errors";
import lib from '../../../lib/index.js'
import { generateTokens, refreshToken } from '../../../lib/auth/jwt-aux.js';
import { sendMedicalRequestEmail } from '../../../lib/email/index.js';
import queryToMongo from 'query-to-mongo'



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
const getMyResults = async (req, res, next) => {
  try {
    const { user } = req
    const results = await Medical_Request.find({userID: user._id, all_tests_completed: true})
    if (results) {
      res.status(200).send({ success: true, results })
    } else {
      res.createError(404, 'No ressults to display not found')
    }
  } catch (error) {
    next(error)
  }
}

const updateMe = async (req, res, next) => {
  try {
    const userID = req.user._id
    const user = await UserModel.findByIdAndUpdate(userID, req.body, { new: true })
    if (user) {
      res.status(200).send({ success: true, user })
    } else {
      res.createError(404, 'User not found')
    }
  } catch (error) {
    next(error)
  }
}
const uploadAvatar = async (req, res, next) => {
  try {
    const avatarUrl = req.file.path
    console.log(avatarUrl)
    const userID = req.user._id
    const user = await UserModel.findByIdAndUpdate(userID, { avatar: avatarUrl }, { new: true })
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

      next(createError(401, "Credentials are not ok!"))
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
    const userMedTestList = tools.createUserMedTestsList(req)
    const availability = await tools.definedUserAvailability(req.body.userAvailability)
    const userID = req.user._id.toString()

    const medicalRequestObj = {
      userID: userID,
      user_tests_requested: userMedTestList,
      user_availability: availability
    }

    const newUserRequest = new Medical_Request(medicalRequestObj)
    const savedRequest = await newUserRequest.save({ new: true })

    req.registeredUser ? await sendMedicalRequestEmail(req.user, savedRequest) : ''

    res.status(201).send(savedRequest)
  } catch (error) {
    next(error)
  }
}

const searchResults = async (req, res, next) => {
  try {
    const userID = req.user._id.toString()
    const query = req._parsedUrl.query

    const { criteria, options } = queryToMongo(query)



    let testsFound = ''
    let valueToSearch = ''
    if (criteria.doctor) {
      valueToSearch = criteria.doctor
      testsFound = await Medical_Request.find({ userID, doctor_name: { $regex: valueToSearch, $options: 'i' } })
    }
    if (criteria.date) {
      valueToSearch = criteria.date
      testsFound = await Medical_Request.find({ userID, lab_date_booked: valueToSearch })
    }
    if (criteria.test) {
      valueToSearch = criteria.test

      testsFound = await Medical_Request.find({ userID, tests_results: {$elemMatch: {testName:  {$regex: valueToSearch, $options: 'i'}  }}})
    }

    res.status(200).send({ msg: 'inside search results', testsFound })
  } catch (error) {
    next(error)
  }
}






const userHandlers = {
  create: create,
  getMe: getMe,
  updateMe: updateMe,
  uploadAvatar: uploadAvatar,
  login: login,
  refreshLogin: refreshLogin,
  OauthRedirect: OauthRedirect,
  bookMedicalRequest: bookMedicalRequest,
  searchResults: searchResults,
  getMyResults:getMyResults

}

export default userHandlers