import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import userModel from './models/user-model.js';
import db from './config/mongoose-connection.js'; // your DB connect file

const createAdmin = async () => {
    const hashedPassword = await bcrypt.hash('admin123', 10);

    await userModel.create({
        name: 'Admin',
        email: 'admin@scatch.com',
        password: hashedPassword,
        role: 'admin'
    });

    console.log('✅ Admin created');
    process.exit();
};

createAdmin();
