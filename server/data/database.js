import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
// DB connection

export const ConnectDB = () => {
    
mongoose
.connect(process.env.MONGO_URI,{
    dbname: process.env.MONGO_DB_NAME,
})
.then(() => console.log('MongoDB connected...'))
.catch((err) => console.log(err));
};