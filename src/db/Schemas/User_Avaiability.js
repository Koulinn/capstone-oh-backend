import mongoose from "mongoose";

const { Schema, model } = mongoose

const User_Availability_Options_Schema = new Schema(
    {
        day_period: { type: String, enum: ['Morning', 'Afternoon', 'Evening', 'ASAP', 'All-day'], required: true, default: 'ASAP' },
        date: { type: Date },
    }
)

export default model('User_availability_Options', User_Availability_Options_Schema)