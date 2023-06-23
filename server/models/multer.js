import mongoose from 'mongoose';


const fileSchema = new mongoose.Schema({
        createdAt: {
            type: Date,
            default: Date.now,
        },
        name: {
            type: String,
            required:[true, 'uploaded file must have a name'],
        },
        path: {
            type: String,
            required:[true, 'uploaded file must have a path'],
        }
});

export default  mongoose.model('file',fileSchema);