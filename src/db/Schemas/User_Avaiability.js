import mongoose from "mongoose";

const { Schema, model } = mongoose

const UserAvailabilityOptionsSchema = new Schema(
    {
        day_period: { type: String, enum: ['Morning', 'Afternoon', 'Evening', 'ASAP', 'All-day'], required: true, default: 'ASAP' },
        date: { type: Date },
    }
)

export default model('UserAvailabilityOptions', UserAvailabilityOptionsSchema)