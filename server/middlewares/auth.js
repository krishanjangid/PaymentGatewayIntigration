import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
export const  isAuthinticated = async (req, res, next) => {
    const token = req.headers.access_token;
    if(!token)
        return res.status(401).json({
            sucess: false,
            message: 'You are not logged in',
        });
        
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 

    req.user = await User.findById(decoded._id);
    next();
};
