import mongoose from 'mongoose';
const Schema = mongoose.Schema;
let schema = new Schema({
   
    transactionid:{
        type:String
    },
    transactionamount:{
        type:String
    },
});
export default  mongoose.model('Transaction', schema);