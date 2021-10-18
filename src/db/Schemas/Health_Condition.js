import mongoose from "mongoose";


const { Schema, model } = mongoose

const Health_Condition = new Schema(
    {
        name: { type: String, required: true, default: 'none' },
        care_requirements: { type: String, required: true, default: 'none' }
    },{
        timestamps : true
    }
)

export default model('Health_Conditions', Health_Condition)