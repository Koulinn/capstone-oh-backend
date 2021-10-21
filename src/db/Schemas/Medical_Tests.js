import mongoose from "mongoose";


const { Schema, model } = mongoose

const MedicalTestsSchema = new Schema(
    {
        name: { type: String, required: true },
        cost: { type: String },
        price: { type: String },
        need_sedation: { type: Boolean, default: false },
        preparation: { type: String, required: true, default: 'none' },
        patient_orientation: { type: String, required: true, default: 'none' },
        covered_by: [{ type: Schema.Types.ObjectId, ref: "HealthcareCompany" }],
    },{
        timestamps : true
    }
)

export default model('MedicalTests', MedicalTestsSchema)