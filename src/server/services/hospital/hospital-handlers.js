import MedicalTestsModel from "../../../db/Schemas/Medical_Tests.js"
import MedicalRequestModel from "../../../db/Schemas/Medical_Request.js"
import AssistantModel from "../../../db/Schemas/Assistant.js"



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

const hospital = {
  addNewTest: addNewTest,
  confirmUserTests: confirmUserTests,
  addResult: addResult,
  addAssistant: addAssistant,
  getAssistant: getAssistant,
  searchTest: searchTest
}

export default hospital