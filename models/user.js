import mongoose from "mongoose"
import bcrypt from "bcrypt"
import validator from "validator"

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    birthDate: {
        type: String,
        required: true,
    },
    engineer: {
        type: mongoose.ObjectId,
        ref: "User",
        required: false,
    },
})

userSchema.statics.signup = async function (
    email,
    password,
    name,
    phoneNumber,
    birthDate
) {
    // validation
    if (!email || !password) {
        throw Error("All fields must be filled")
    }
    if (!validator.isEmail(email)) {
        throw Error("Email not valid")
    }

    const exists = await this.findOne({ email })

    if (exists) {
        throw Error("تم تسجيل حساب البريد الالكتروني من قبل")
    }


    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const user = await this.create({
        email,
        password: hash,
        name,
        role: "Engineer",
        phoneNumber,
        birthDate,
    })

    return user
}

userSchema.statics.changePassword = async function (
    _id,
    password,
) {
    // validation
    if (!password) {
        throw Error("All fields must be filled")
    }

    if (!validator.isStrongPassword(password)) {
        throw Error("Password not strong enough")
    }

    
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    
    const user = await this.findByIdAndUpdate({ _id: _id },{password: hash, firstTime: false })
    return user
}

userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error("All fields must be filled")
    }
    
    const user = await this.findOne({ email: email.toLowerCase() })
    if (!user) {
        throw Error("البريد الالكتروني أو كلمة المرور خاطئة")
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error("البريد الالكتروني أو كلمة المرور خاطئة")
    }

    return user
}


export default mongoose.model("User", userSchema)
