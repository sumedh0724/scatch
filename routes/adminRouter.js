import express from 'express';
import ownerModel from '../models/admin-model.js';
import productsModel from '../models/products-model.js';
const router = express.Router();
import multer from 'multer';
import upload from '../config/multer-config.js';

router.get('/', (req,res)=>{
    res.send("On admin-route.");
});

if(process.env.NODE_ENV==='development'){

    router.post('/create-owner', async (req,res)=>{
        let owners = await ownerModel.find();
        if(owners.length>0){
            res.status(505).send("You don't have any access to create a new owner.");
        }
        else{
            const {name, email, password} = req.body;
            const owner = ownerModel.create({
                name,
                email,
                password
            });
            res.status(200).send(`Owner created successfully. Welcome ${name}`);
        }
    });

    // router.get('/shop', async (req,res)=>{
    //     let products = await productsModel.find();
    //     res.render('mainpage.ejs', {products});
    // })

    router.get('/shop', (req,res)=>{
        res.redirect('/products/shop/');
    })

    router.get('/logout', (req,res)=>{
        res.redirect("/");
    })

    router.post('/create-product', upload.single('picture'), async (req,res)=>{
        let picture = req.file.buffer;
        const {name, discount, price, textcolor, bgcolor, panelcolor} = req.body;

        let product = await productsModel.create({
            name,
            picture,
            price,
            discount,
            bgcolor,
            textcolor,
            panelcolor
        }); 
        res.redirect("/admin/shop");
    })

}
else console.log(process.env.NODE_ENV);

export default router;
