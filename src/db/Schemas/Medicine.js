import mongoose from "mongoose";

const { Schema, model } = mongoose

const MedicineSchema = new Schema(
    {
        name: { type: String, required: true },
        care_requirements: { type: String, default: 'none' },
    },{
        timestamps : true
    }
)

export default model('Medicine', MedicineSchema)