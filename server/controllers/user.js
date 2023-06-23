import { User } from "../models/user.js";
import bcrypt from 'bcrypt';
import { sendCookie } from "../utils/features.js";
import Filemodel from "../models/multer.js";
import cloudinary from '../middlewares/cloudinary.js'
import jwt from 'jsonwebtoken';
import cron from 'node-cron';
import transporter from '../middlewares/nodemailer.js';
import Razorpay from 'razorpay';
import Stripe from "stripe";
import dotenv from 'dotenv';
import Transaction from "../models/transaction.js";


dotenv.config();

export const loginUser = async (req, res, next) => {
    const {email, password} = req.body;
    const user = await User.findOne({email}).select('+password');
    if(!user)
        return res.status(400).json({
            sucess: false,
            message: 'Invalid Email or Password',
        });
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch)
        return res.status(400).json({
            sucess: false,
            message: 'Invalid Password',
        });
    const token = jwt.sign({_id: user._id},process.env.JWT_SECRET);
    res
    .status(200)
    .json({
            sucess: true,
            token,
        });
};

export const createUser = async (req, res) => {
    
    try{
        const {name, email, password,dob,mobile,file} = req.body;
        console.log(req.body);
        let user = await User.findOne({email});
        
        if(user){
          return   res.status(400).json({
                sucess: false,
                message: 'User already exists',
            });
        }

        const hasedPassword = await bcrypt.hash(password, 10);
        const fileurl = await cloudinary.v2.uploader.upload(req.file.path);
        console.log(fileurl.secure_url);
        const newuser = await User.create({
            name,
            email,
            password: hasedPassword,
            dob,
            mobile,
            file:fileurl.secure_url,
        });
       res.status(200).json({msg:"User created successfully",newuser});
    }
    catch(err){
        res.status(400).json({
            sucess: false,
            msg: err.message,
        });
    }

    

};

export const getMyProfile = (req, res) => {
    res.status(200).json({
        sucess: true,
        user: req.user,
    });
};

export const logout = (req, res) => {
    
    res.status(200).json({
        sucess: true,
        message: 'Logged out successfully',
    });
}

export const updateUser = async (req, res) => {
    const {id} = req.params;
    const user = await User.findById(id);

    res.json({
        sucess: true,
        message: 'updated successfully',
    });
};

export const fileUpload = async (req, res) => {
    try{
        const file = req.file;
        console.log(file.path);
        const fileurl = await cloudinary.v2.uploader.upload(req.file.path);
        await Filemodel.create(
            {
                name: file.filename,
                path : fileurl.secure_url,
                
            });
        res.json(file);
        
    }
    catch(err){
        res.status(400).json({
            sucess: false,
            message: err.message,
        });
    }
    
};
export const makepayment = async (req, res) => {
    try{

        const amount = req.body.amount;
        var instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
          })
        let options = {
          amount: amount*100,  // amount in the smallest currency unit
          currency: "INR",
          receipt: "order_rcptid_11",
          payment_capture : 1
        };
        console.log(typeof(amount));
        instance.orders.create(options, function(err, order) {
          if(err){
            return res.send(err)}
          else{
           return res.json(order)   
        }
        });
        
//         const transaction = new Transaction({
//             transactionid:req.body.transactionid,
//             transactionamount:req.body.transactionamount,
//         });
//         transaction.save(function(err, savedtransac){
//           if(err){
//               console.log(err);
//               return res.status(500).send("Some Problem Occured");
//           }
//           res.send({transaction: savedtransac});
// });

    }
    catch(err){
        res.status(400).json({
            sucess: false,
            message: err.message,
        });
    }
    
};

//razorpay payment verification

export const verifyPayment = async (req, res) => {
    
    try{
        console.log(req.body);
        const user = await User.findById();
        const transaction = await Transaction.create({

           
            transactionid:req.body.razorpay_order_id,
            transactionamount:req.body.amount/100,
        });

        res.status(200).json({
            sucess: true,
        });
    }
    catch(err){
        res.status(400).json({
            sucess: false,
            message: err.message,
        });
    }
    
}

//stripe payment

export const stripepayment = async (req, res) => {
    try{
            
            const {price,title,image} = req.body;
            
            console.log(price,title,image);

            const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'payment',
                line_items: [
                    {
                        price_data: {
                            
                            currency: 'inr',
                            product_data: {
                                name: req.body.title,
                                images: [req.body.image],
                            },
                            unit_amount: Math.floor(Number(req.body.price*100)),
                        },
                        quantity: 1,
                    },
                ],
                success_url: `${process.env.HOST_URL}`,
                cancel_url: `${process.env.HOST_URL}`,
            })
            return res.json({url:session.url});
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
}

export const mailsend = async (req, res) => {
    try{
        const {email, subject, text,task} = req.body;


        if(task=='schedule'){
            Task.start();
        }
        Task.stop();
        const mailOptions = {
            from: process.env.MAIL_USER,
            to: email,
            subject: subject,
            text: text,
          };
        const info = await transporter.sendMail(mailOptions);
        res.json({
            sucess: true,
            message: 'Mail sent successfully to '+email+' with message id '+info.messageId+' and response '+info.response,
        });
    }
    catch(err){
        res.status(400).json({
            sucess: false,
            message: err.message,
        });
    }
    

};


const Task = cron.schedule('* * * * *', async () => {
        
    // console.log('running a task every minute');  
    // transporter.sendMail(mailOptions);
  });
