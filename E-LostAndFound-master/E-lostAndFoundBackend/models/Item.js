import mongoose from 'mongoose'

const itemSchema = mongoose.Schema({
    id: Number,
    name: String,
    type: String,
    img: String,
    flag: Number
})

export default mongoose.model('items', itemSchema)