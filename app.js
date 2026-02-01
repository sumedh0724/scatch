import express from 'express';
import bcrypt from 'bcrypt';
import path from 'path';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import userRouter from './routes/usersRouter.js';
import productRouter from './routes/productsRouter.js';
// import adminRouter from './routes/adminRouter.js';
import userModel from './models/user-model.js';
import productModel from './models/products-model.js';
// import adminModel from './models/admin-model.js';
import db from './config/mongoose-connection.js'
import { fileURLToPath } from 'url';
import session from 'express-session';
import flash from 'connect-flash';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('view-engine', 'ejs');
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: false
}));

app.use(flash());

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

app.get('/', (req,res)=>{
    console.log("File running successfully...");
    req.session.user = '';
    res.render('homepage.ejs', {isLoggedIn: false});
});

app.use('/users', userRouter);
app.use('/products', productRouter);
// app.use('/admin', adminRouter);

app.listen(3000);