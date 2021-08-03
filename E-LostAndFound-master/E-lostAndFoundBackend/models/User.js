import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    verified:{
        type: Boolean,
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    registered_date: {
        type: Date,
        default: Date.now
    },
    otp: {
        type: String
    }
})

export default mongoose.model('user', userSchema)