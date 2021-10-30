import mongoose from "mongoose";

const { Schema, model } = mongoose

const MessageSchema = new Schema(
    {
        senderID: { type: String, required: true },
        senderRole: { type: String, default: 'user' },
        text:  { type: String },
        files: [{ type: String }],
    },{
        timestamps : true
    }
)

export default model('Messages', MessageSchema)