import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const { Schema, model } = mongoose

const Health_Condition = new Schema(
    {
        name: { type: String, required: true },
        care_requirements: { type: String, required: true }
    },{
        timestamps : true
    }
)

export default model('Health_Conditions', HealthConditionSchema)