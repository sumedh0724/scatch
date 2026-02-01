import express from 'express';
import productsModel from '../models/products-model.js';
import userModel from '../models/user-model.js';
const router = express.Router();
import isAdmin from '../middlewares/isAdmin.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';

router.get('/', (req,res)=>{
    res.send("On products-route.");
});

router.get('/shop', isLoggedIn, async (req,res)=>{
    let products = await productsModel.find();
    res.render('mainpage.ejs', {products});
})

router.post('/shop', isLoggedIn, async (req,res)=>{
    let user = await userModel.findOne({email: req.body.email});
    if(user){
        let products = await productsModel.find();
        res.render('mainpage.ejs', {products});
    }
    else{
        req.flash('error', 'Invalid user');
        res.redirect('/');
    }
})

router.get('/create-product', isLoggedIn, isAdmin, (req,res)=>{
        res.render('createProduct.ejs');
});

export default router;
