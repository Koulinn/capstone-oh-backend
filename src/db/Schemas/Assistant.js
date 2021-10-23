import mongoose from "mongoose";

const { Schema, model } = mongoose

const AssistantModel = new Schema(
    {
        name: { type: String, required: true },
        role: { type: String, default: 'assistant' },
        avatar: { type: String },
    },{
        timestamps : true
    }
)

export default model('Assistants', AssistantModel)