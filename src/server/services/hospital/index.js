import express from "express"
import multer from 'multer'
import hospital from './hospital-handlers.js'

const {
  addNewTest,
  confirmUserTests,
  addResult,
  addAssistant,
  getAssistant,
  searchTest,
  getUnconfirmedMedicalRequests,
  getUsers,
} = hospital


const router = express.Router()

router
  .route("/")
  .post(addNewTest)
  .get(searchTest)
router.route("/medicalRequests").get(getUnconfirmedMedicalRequests);
router.route("/medicalRequests/:requestID").put(confirmUserTests);
router.route("/user").get(getUsers);
router.route("/addResult/:requestID").put(addResult);
router.route("/assistants").post(addAssistant).get(getAssistant);




export default router
