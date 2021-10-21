import MedicalTestsModel from "../../../db/Schemas/Medical_Tests.js"
import MedicalRequestModel from "../../../db/Schemas/Medical_Request.js"



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
const addResult = async (req, res, next) => {
    try {
      const {requestID}=req.params
      const updatedRequest = await MedicalRequestModel.findByIdAndUpdate(requestID, {$push: {tests_results: req.body }},  { new: true })
      res.status(201).send({ success: true, updatedRequest })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

const confirmUserTests = async (req, res, next) => {
    try {
      const {requestID}=req.params
      const updatedRequest = await MedicalRequestModel.findByIdAndUpdate(requestID, req.body , { new: true })
      .populate("confirmed_tests_requested")
      
      res.status(203).send({ success: true, updatedRequest })
  
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

const hospital = {
    addNewTest:addNewTest,
    confirmUserTests:confirmUserTests,
    addResult:addResult
}

export default hospital