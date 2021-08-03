import mongoose from 'mongoose'

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId:{type: String},
    name: { type: String },
    email: {type: String},
    place: { type: String },
    typeob: {type: String},
    descp: {type: String},
    productImage: { data: Buffer }
});

export default mongoose.model('Found', productSchema);