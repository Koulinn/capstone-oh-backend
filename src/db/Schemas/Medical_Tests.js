import mongoose from "mongoose";


const { Schema, model } = mongoose

const Medical_Tests_Schema = new Schema(
    {
        name: { type: String, required: true },
        cost: { type: String, required: true },
        price: { type: String, required: true },
        need_sedation: { type: Boolean, default: false },
        preparation: { type: String, required: true, default: 'none' },
        patient_orientation: { type: String, required: true, default: 'none' },
        is_completed: { type: Boolean, default: false },
        result: { type: String },
        covered_by: [{ type: Schema.Types.ObjectId, ref: "Healthcare_Company" }],

    },{
        timestamps : true
    }
)

export default model('Medical_Tests', Medical_Tests_Schema)