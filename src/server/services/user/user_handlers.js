import UserModel from '../../../db/Schemas/User.js'
import lib from '../../../lib/index.js'
import createError from "http-errors";

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
    const user = await UserModel.findById('616d7683cc72c595e4657064')
    if (user) {
      res.status(200).send({ success: true, user })
    } else {
      res.createError(404, 'User not found')
    }
  } catch (error) {
    next(error)
  }
}

const userHandlers = {
  create: create,
  getMe: getMe

}

export default userHandlers