import express from 'express';
import userModel from '../models/user-model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import productsModel from '../models/products-model.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';
import isAdmin from '../middlewares/isAdmin.js';
const router = express.Router();

router.get('/', (req,res)=>{
    res.send("On user-route.");
})

router.post('/login-user', async (req,res)=>{
    const {email,password} = req.body;
    const user = await userModel.findOne({email});
    if(!user){
        // res.status(400).send("No such user created. Please create an account.")
        req.flash('error', 'No such user created. Please create an account.');
        return res.redirect('/');
    }
    else{
        bcrypt.compare(password, user.password, function(err, result){
            if(result){
                const token = jwt.sign({email}, 'userloginkey');
                console.log("okk");
                res.cookie('token', token);
                req.session.user = user;
                res.redirect("/products/shop");
            }
            else{
                // res.status(404).send("Invalid credentials.");
                req.flash('error', 'Invalid credentials');
                res.redirect('/');
            }
        });
        
    }
});

router.post('/create-user', async (req,res)=>{
    const {name, email, password} = req.body;
    const user = await userModel.findOne({email});
    if(!user){
            bcrypt.genSalt(10, function(err, salt) {
            if (err) {
                console.error("Error generating salt:", err.message);
                return;
            }
    
            bcrypt.hash(password, salt, async function(err, hashedPassword) {
            if (err) {
                console.error("Error hashing password:", err.message);
                return;
            }
            
            const user = await userModel.create({
                name,
                email,
                password: hashedPassword
            });

            req.flash('success', 'User created successfully. Please login.');
                res.redirect('/');
            });
        });
    }
    else{
        req.flash('error', 'Already an account registered. Please login.');
        res.redirect('/');
    }
});

export default router;