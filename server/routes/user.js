import express  from "express";
import { 
    getMyProfile,
    createUser,
    loginUser,
    logout,
    fileUpload,
    mailsend,
    makepayment,
    stripepayment,
    verifyPayment,
} from "../controllers/user.js";
import { isAuthinticated } from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";



const router = express.Router();

router.post('/signup',upload.single("file"),createUser);
router.post('/login',loginUser);
router.get('/me', isAuthinticated,getMyProfile);
router.get('/logout', isAuthinticated,logout);
router.post('/file',upload.single("image"),isAuthinticated, fileUpload);
router.post('/sendmail',isAuthinticated, mailsend);
router.post('/order', makepayment);
router.post('/paymentvarification', verifyPayment)
router.post('/create-checkout-session',isAuthinticated, stripepayment);



// router.get('/userid/:id', getUserById);
// router.put('/userid/:id', updateUser);
// router.delete('/userid/:id', deleteUser);

export default router;