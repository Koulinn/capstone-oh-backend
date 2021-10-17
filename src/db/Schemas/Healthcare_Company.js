import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const { Schema, model } = mongoose

const Healthcare_Company = new Schema(
    {
        name: { type: String, required: true },
        phone_1: { type: String, required: true },
        phone_2: { type: String },
    },{
        timestamps : true
    }
)

export default model('Healthcare_Company', HealthcareCompanySchema)