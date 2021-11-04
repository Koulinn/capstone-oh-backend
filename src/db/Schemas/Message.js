import mongoose from "mongoose";

const { Schema, model } = mongoose

const MessageSchema = new Schema(
    {
        senderID: { type: String, required: true },
        senderRole: { type: String, enum: ['assistant', 'user'], default: 'user' },
        roomID:  { type: Schema.Types.ObjectId, ref: "Rooms", required: true },
        text:  { type: String },
        files: { type: String },
    },{
        timestamps : true
    }
)

export default model('Messages', MessageSchema)