import mongoose, { mongo } from "mongoose";

const adminModel = mongoose.Schema({
    name: String,
    email: String,
    products:{
        type: Array,
        default: []
    },
    password: String
});

export default mongoose.model('adminModel', adminModel);
