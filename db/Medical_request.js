import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const { Schema, model } = mongoose

const Medical_Request_Schema = new Schema(
    {
        personID: { type: Schema.Types.ObjectId, ref: "People" },
        doctor_name: { type: String, required: true },
        doctor_professional_register_ID: { type: String, required: true },
        tests_requested: [{ type: Schema.Types.ObjectId, ref: "Medical_tests" }],
        isCompleted: { type: Boolean, default: false}
    },{
        timestamps : true
    }
)

export default model('Medical_Request', MedicalSchema)