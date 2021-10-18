import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const { Schema, model } = mongoose

const UserSchema = new Schema(
    {
        name: { type: String, required: true },
        surname: { type: String, required: true },
        avatar: { type: String, default: "https://ui-avatars.com/api/?name=Unnamed+User", },
        email: { type: String, unique: true, required: true },
        password: { type: String },
        googleId: { type: String },
        refreshToken: { type: String },
        birth_date: { type: Date },
        age: {
            age_years:{ type: String },
            age_months:{ type: String},
        },
        phone_primary: { type: Number },
        phone_secondary: { type: Number },
        health_data: {
            healthcarePlan:[{ type: Schema.Types.ObjectId, ref: "Healthcare_plan" }],
            weight: { type: Number },
            height: { type: Number },
            need_carer: { type: Boolean, default: false },
            take_regular_medicine: { type: Boolean, default: false },
            patient_personal_information: { type: String },
            medicine_list: [{ type: Schema.Types.ObjectId, ref: "Medicine" }],
            health_condition: [{ type: Schema.Types.ObjectId, ref: "Health_condition" }],

        },
        current_address: {
            street: { type: String },
            additional_info: { type: String },
            number: { type: String },
            post_code: { type: String },
            city: { type: String }
        },
        medical_tests_requested: [{ type: Schema.Types.ObjectId, ref: "Medical_request" }],
        medical_tests_result: [{ type: Schema.Types.ObjectId, ref: "Medical_request" }],

    },
    { timestamps: true }
);


UserSchema.statics.checkCredentials = async function (email, password) {
    const user = await this.findOne({ email })

    if (user) {

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) return user
        else return null
    } else {
        return null
    }
}

UserSchema.pre("save", async function (next) {
    this.avatar = `https://ui-avatars.com/api/?name=${this.name}`;

    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12)
    }
    next();
});

UserSchema.pre('findOneAndUpdate', async function () {
    const update = this.getUpdate();
    const { password: plainPwd } = update

    if (plainPwd) {
        const password = await bcrypt.hash(plainPwd, 10)
        this.setUpdate({ ...update, password })
    }
});


UserSchema.methods.toJSON = function () {
    const userDocument = this
    const userObject = userDocument.toObject()

    delete userObject.password
    delete userObject.__v

    return userObject
}



export default model('Users', UserSchema)