import mongoose, { mongo } from "mongoose";

const productsModel = mongoose.Schema({
    name: String,
    picture: Buffer,
    discount:{
        type: Number,
        default: 0,
    },
    price: Number,
    bgcolor: String,
    panelcolor: String,
    textcolor: String
});

export default mongoose.model('productModel', productsModel);
