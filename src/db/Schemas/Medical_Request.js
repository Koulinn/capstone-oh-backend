import mongoose from "mongoose";


const { Schema, model } = mongoose

const MedicalRequestSchema = new Schema(
    {
        userID: { type: Schema.Types.ObjectId, ref: "Users" },
        doctor_name: { type: String, required: true },
        doctor_professional_register_ID: { type: String, required: true },
        tests_requested: [{ type: Schema.Types.ObjectId, ref: "Medical_tests" }, {required : true}],
        user_availability: [{ type: Schema.Types.ObjectId, ref: "User_availability_Options" }, {required: true}],
        is_user_confirmed: { type: Boolean, default: false},
        lab_date_booked: { type: Date}
    },{
        timestamps : true
    }
)

export default model('MedicalRequest', MedicalRequestSchema)