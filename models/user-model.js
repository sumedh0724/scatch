import mongoose, { mongo } from "mongoose";

const userModel = mongoose.Schema({
    name: String,
    email: String,
    cart:{
        type: Array,
        default: []
    },
    orders:{
        type: Array,
        default: []
    },
    password: String,
    isAdmin: Boolean,
    picture: String,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
});

export default mongoose.model('userModel', userModel);
