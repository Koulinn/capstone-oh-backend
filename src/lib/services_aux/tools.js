import { getAge } from "get-complete-age"
import { validationResult } from "express-validator";
import createError from "http-errors";


// date must be mm-dd-yyyy
const getPreciseAge = (date) => {
    return getAge.getAge(date)

}

const checkSchemaErrors = (req, res, next) => {
    try {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            next(createError(400, "Validation error", errors))
        } else {
            next()
        }
    } catch (error) {
        console.log(error)
        next()
    }
}


const createUserMedTestsList = (req) => {
    let allMedicalRequests = {
        userTags: [],
        userFilesURL: [],
    }
    const tags = req.body.medicalRequestsTags
    const requestsUrls = req.files.medicalRequestsImgs

    //for images/files
    Array.isArray(requestsUrls) ? allMedicalRequests.userFilesURL = [...requestsUrls.map(request => request.path)] : ''

    //multiples tags
    Array.isArray(tags) ? allMedicalRequests.userTags = [...tags] : ''
    //single tags
    tags && !Array.isArray(tags) ? allMedicalRequests.userTags = [tags] : ''



    return allMedicalRequests
}

const parseUserAvailability = async (req)=>{
    const userAvailability = await JSON.parse(req.body.userAvailability)
    console.log(userAvailability)
    return userAvailability
  }


const tools = {
    getPreciseAge: getPreciseAge,
    checkSchemaErrors: checkSchemaErrors,
    createUserMedTestsList: createUserMedTestsList,
    parseUserAvailability:parseUserAvailability
}

export default tools