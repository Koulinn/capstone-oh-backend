import mongoose from "mongoose";
import UserModel from './User.js'


const { Schema, model } = mongoose

const MedicalRequestSchema = new Schema(
    {
        userID: { type: Schema.Types.ObjectId, ref: "Users" },
        doctor_name: { type: String },
        doctor_professional_register_ID: { type: String },
        //user will send files or tests names, often misspelling 
        user_tests_requested: { type: Schema.Types.Mixed, default: 'Contact user' },
        //medical facility will have to select the tests
        confirmed_tests_requested: [{ type: Schema.Types.ObjectId, ref: "Medical_tests" }],
        user_availability: [{type: Schema.Types.Mixed, default: 'ASAP' }],
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

export default model('MedicalRequest', MedicalRequestSchema)