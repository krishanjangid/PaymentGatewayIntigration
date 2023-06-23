import jwt from 'jsonwebtoken';

export const sendCookie = (newuser,res,message,statusCode=200) => {
        const token = jwt.sign({_id: newuser._id},process.env.JWT_SECRET);
        
        res
        .status(statusCode)
        .json({
            sucess: true,
            message,
        });

};