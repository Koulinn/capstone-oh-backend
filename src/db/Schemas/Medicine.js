import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const { Schema, model } = mongoose

const Medicine = new Schema(
    {
        name: { type: String, required: true },
        care_requirements: { type: String, default: 'none' },
    },{
        timestamps : true
    }
)

export default model('Medicine', MedicineSchema)