import mongoose from "mongoose";

const { Schema, model } = mongoose

const RoomsModel = new Schema(
    {
        UserID: { type: Schema.Types.ObjectId, ref: "Users", required: true },
        AssistantID: { type: Schema.Types.ObjectId, ref: "Assistants", required: true },
        chatHistory: [{ type: Schema.Types.ObjectId, ref: "Messages"}]
    },{
        timestamps : true
    }
)

export default model('Rooms', RoomsModel)