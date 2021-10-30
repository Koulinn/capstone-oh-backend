import { getAge } from "get-complete-age"
import { validationResult } from "express-validator";
import createError from "http-errors";
import { verifyJWT } from "../auth/jwt-aux.js";
import UserModel from '../../db/Schemas/User.js'


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
        next()
    }
}


const createUserMedTestsList = async(req) => {
    let allMedicalRequests = {
        userTestsTags: [],
        userFilesURL: [],
    }
    const tags = await JSON.parse(req.body.medicalRequestsTags)
    const requestsUrls = req.files.medicalRequestsImgs

    //for images/files
    Array.isArray(requestsUrls) ? allMedicalRequests.userFilesURL = [...requestsUrls.map(request => request.path)] : allMedicalRequests.userFilesURL = []

    //multiples tags
    Array.isArray(tags) ? allMedicalRequests.userTestsTags = [...tags] : ''
    //single tags
    tags.length === 0 ? allMedicalRequests.userTestsTags = [] : ''


    return allMedicalRequests
}

const parseJSON = async (req) => {
    const parsedJSON = await JSON.parse(req)
    return parsedJSON
}

const isLoggedUser = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.replace("Bearer ", "")
            const decodedToken = await verifyJWT(token)
            const user = await UserModel.findById(decodedToken._id)
            req.user = user
            req.registeredUser = true
        }

        next()

    } catch (error) {
        next(error)
    }

}


const checkExistentEmail = async (req, res, next) => {
    try {
        if (req.user) {
            next()
        } else {
            const parsedUser = await parseJSON(req.body.preDefinedUser)
            const existentUser = await UserModel.findOne({ email: parsedUser.email })
            req.user = existentUser
            next()
        }
    } catch (error) {
        next(error)
    }
}

const createPreDefinedUser = async (req, res, next) => {
    try {
        if (req.user) {
            next()
        } else {
            const parsedUser = await parseJSON(req.body.preDefinedUser)
            const newUser = new UserModel(parsedUser)
            const savedUser = await newUser.save({ new: true })
            req.user = savedUser
            next()
        }
    } catch (error) {
        next(error)
    }

}

const definedUserAvailability = async (req) => {
    const userAvailability = await tools.parseJSON(req)
    if (userAvailability[0].hasOwnProperty('ASAP')) {
        return userAvailability[0]
    } else {
        return userAvailability
    }
}

const convertFacility = async (facility)=>{
    try {
        return await parseJSON(facility)
    } catch (error) {
        console.log(error)
    }

}


const tools = {
    getPreciseAge: getPreciseAge,
    checkSchemaErrors: checkSchemaErrors,
    createUserMedTestsList: createUserMedTestsList,
    parseJSON: parseJSON,
    isLoggedUser: isLoggedUser,
    createPreDefinedUser: createPreDefinedUser,
    definedUserAvailability: definedUserAvailability,
    checkExistentEmail:checkExistentEmail,
    convertFacility:convertFacility
}

export default tools