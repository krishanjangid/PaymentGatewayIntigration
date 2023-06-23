import mongoose from 'mongoose';

//DB schema
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    dob:{
        type: String,
        
    },
    mobile:{
        type: Number,
        
    },
    file:{
        type: String,
        
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    subscription:{
        type: String,
        enum: ['free','pro','premium'],
        default: 'free',
    },
    daysleft:{
        type: Number,
        default: 7,
    }
});

export const User = mongoose.model('User', schema);
