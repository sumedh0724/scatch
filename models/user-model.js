import mongoose, { mongo } from "mongoose";

const userModel = mongoose.Schema({
    name: String,
    email: String,
    cart:[{
        type: Array,
    }],
    password: String
});

export default mongoose.model('userModel', userModel);
