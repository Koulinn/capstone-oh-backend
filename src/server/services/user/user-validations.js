import { checkSchema, validationResult } from "express-validator";
import createError from "http-errors";

const userValidationSchema = {
    "name": {
        in: ["body"],
        isString: {
            errorMessage: "Name must be string"
        }
    },
    "surname": {
        in: ["body"],
        isString: {
            errorMessage: "surname must be string"
        }
    },
    "email": {
        in: ["body"],
        isString: {
            errorMessage: "email must be string"
        }
    },
    "password": {
        in: ["body"],
        isLength: {
            errorMessage: 'Password should be at least 7 chars long',
            options: { min: 7 },
        },
    },
    "birth_date": {
        in: ["body"],
        isString: {
            errorMessage: "birth_date must be string and the formate should follow mm-dd-yyyy"
        }
    }
}

const userValidator = checkSchema(userValidationSchema)


const validations = {
    userValidator: userValidator,

}

export default validations