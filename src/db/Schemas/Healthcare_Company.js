import mongoose from "mongoose";


const { Schema, model } = mongoose

const HealthcareCompany = new Schema(
    {
        name: { type: String, required: true, default: 'private' },
        phone_1: { type: String, required: true },
        phone_2: { type: String },
    },{
        timestamps : true
    }
)

export default model('HealthcareCompany', HealthcareCompany)