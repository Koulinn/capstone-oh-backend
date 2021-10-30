import mongoose from "mongoose";


const { Schema, model } = mongoose

const HealthCondition = new Schema(
    {
        name: { type: String, required: true, default: 'none' },
        care_requirements: { type: String, required: true, default: 'none' }
    },{
        timestamps : true
    }
)

export default model('HealthConditions', HealthCondition)