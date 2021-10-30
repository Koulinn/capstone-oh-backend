import mongoose from "mongoose";
import UserModel from './User.js'


const { Schema, model } = mongoose

const MedicalRequestSchema = new Schema(
    {
        userID: { type: Schema.Types.ObjectId, ref: "Users" },
        doctor_name: { type: String },
        doctor_professional_register_ID: { type: String },
        user_tests_requested: { type: Schema.Types.Mixed, default: 'Contact user' },
        confirmed_tests_requested: [{ type: Schema.Types.ObjectId, ref: "MedicalTests" }],
        tests_results: [{ type: Schema.Types.Mixed }],
        facility:{type: Schema.Types.Mixed},
        user_availability: [{type: Schema.Types.Mixed, default: 'To confirm' }],
        all_tests_completed: { type: Boolean, default: false},
        lab_date_booked: { type: Date},
        is_user_confirmed: { type: Boolean, default: false}
    },{
        timestamps : true
    }
)

MedicalRequestSchema.pre("save", async function (next) {
    await UserModel.findByIdAndUpdate(this.userID, {$push: { medical_tests_requested: this._id }})
    next();
});

export default model('MedicalRequests', MedicalRequestSchema)