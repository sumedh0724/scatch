import mongoose, { mongo } from "mongoose";

const productsModel = mongoose.Schema({
    name: String,
    picture: String,
    discount:{
        type: Number,
        default: 0,
    },
    bgcolor: String,
    panelcolor: String,
    textcolor: String
});

export default mongoose.model('productModel', productsModel);
