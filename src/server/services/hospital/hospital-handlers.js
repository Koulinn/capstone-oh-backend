import MedicalTestsModel from "../../../db/Schemas/Medical_Tests.js"
import MedicalRequestModel from "../../../db/Schemas/Medical_Request.js"
import AssistantModel from "../../../db/Schemas/Assistant.js"
import UserModel from "../../../db/Schemas/User.js"
import RoomModel from "../../../db/Schemas/Rooms.js"



const addNewTest = async (req, res, next) => {
  try {
    const newTest = new MedicalTestsModel(req.body)
    const savedTest = await newTest.save({ new: true })
    res.status(201).send({ success: true, savedTest })

  } catch (error) {
    console.log(error)
    next(error)
  }
}
const searchTest = async (req, res, next) => {
  try {
    const {testName}  = req.query
    const testsFound = await MedicalTestsModel.find( {name: { $regex: testName, $options: 'i' }}, {name:1, _id:0})
    .limit(5)
    const tests = testsFound.map(t=> t.name)
    
    res.status(200).send({ success: true, tests })

  } catch (error) {
    console.log(error)
    next(error)
  }
}
const getUnconfirmedMedicalRequests = async (req, res, next) => {
  try {
    
    const unconfirmedMedicalRequests = await MedicalRequestModel.find( {is_user_confirmed: false})    
    res.status(200).send({ success: true, unconfirmedMedicalRequests })

  } catch (error) {
    console.log(error)
    next(error)
  }
}
const addResult = async (req, res, next) => {
  try {
    const { requestID } = req.params
    const updatedRequest = await MedicalRequestModel.findByIdAndUpdate(requestID, { $push: { tests_results: req.body } }, { new: true })
    res.status(201).send({ success: true, updatedRequest })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

const confirmUserTests = async (req, res, next) => {
  try {
    const { requestID } = req.params
    const updatedRequest = await MedicalRequestModel.findByIdAndUpdate(requestID, req.body, { new: true })
      .populate("confirmed_tests_requested")

    res.status(203).send({ success: true, updatedRequest })

  } catch (error) {
    console.log(error)
    next(error)
  }
}


const addAssistant = async (req, res, next) => {
  try {
    req.body.avatar = 'https://ui-avatars.com/api/?name=' + req.body.name

    const newAssistant = new AssistantModel(req.body)
    const savedAssistant = await newAssistant.save({ new: true })
    res.status(201).send({ success: true, savedAssistant })

  } catch (error) {
    console.log(error)
    next(error)
  }
}
const getAssistant = async (req, res, next) => {
  try {

    const assistants = await AssistantModel.find()
    res.status(201).send({ success: true, assistants })

  } catch (error) {
    console.log(error)
    next(error)
  }
}
const getUsers = async (req, res, next) => {
  try {

    //data
    //medicalRequest
    console.log(req.query)
    if(req.query.medicalRequest){
      const userID = req.query.medicalRequest
      const requests = await MedicalRequestModel.find({userID: userID})

      res.status(200).send({ success: true, requests })
      return
    }
    if(req.query.personalData){
      const userID = req.query.personalData
      const user = await UserModel.find({_id: userID}, {refreshToken: 0, googleId:0})

      res.status(200).send({ success: true, user })
      return
    }
    if(req.query.chatHistory){
      const userID = req.query.chatHistory
      const chatHistory = await RoomModel.find({UserID :userID})
      .populate('chatHistory')

      res.status(200).send({ success: true, chatHistory })
      return
    }

    const users = await UserModel.find().select('name surname avatar email phone_primary createdAt _id')
    .limit(5)
    res.status(200).send({ success: true, users })

  } catch (error) {
    console.log(error)
    next(error)
  }
}

const hospital = {
  addNewTest: addNewTest,
  confirmUserTests: confirmUserTests,
  addResult: addResult,
  addAssistant: addAssistant,
  getAssistant: getAssistant,
  searchTest: searchTest,
  getUnconfirmedMedicalRequests:getUnconfirmedMedicalRequests,
  getUsers:getUsers,
}

export default hospital