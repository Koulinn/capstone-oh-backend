import { getAge } from "get-complete-age"
import {validationResult } from "express-validator";
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


const tools = {
    getPreciseAge: getPreciseAge,
    checkSchemaErrors: checkSchemaErrors
}

export default tools