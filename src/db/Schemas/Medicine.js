import mongoose from "mongoose";

const { Schema, model } = mongoose

const Medicine_Schema = new Schema(
    {
        name: { type: String, required: true },
        care_requirements: { type: String, default: 'none' },
    },{
        timestamps : true
    }
)

export default model('Medicine', Medicine_Schema)