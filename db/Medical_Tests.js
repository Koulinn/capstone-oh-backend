import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const { Schema, model } = mongoose

const Medical_Tests = new Schema(
    {
        name: { type: String, required: true },
        cost: { type: String },
        price: { type: String },
        need_sedation: { type: Boolean, default: false },
        preparation: { type: String, default: 'none' },
        patient_orientation: { type: String, default: 'none' },
        is_completed: { type: Boolean, default: false },
        result: { type: String },
        covered_by: { type: Schema.Types.ObjectId, ref: "Healthcare_Company" },

    },{
        timestamps : true
    }
)

export default model('Medical_Tests', MedicalTestsSchema)