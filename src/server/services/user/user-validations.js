import { checkSchema, validationResult } from "express-validator";


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
    "phone_primary": {
        in: ["body"],
        isLength: {
            errorMessage: 'phone_primary must be a string',
        },
    }
   
}

const userValidator = checkSchema(userValidationSchema)


const validations = {
    userValidator: userValidator,

}

export default validations