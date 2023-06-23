import express  from "express";
import cron from "node-cron";
import { 
    getMyProfile,
    createUser,
    loginUser,
    logout,
    fileUpload,
    mailsend
} from "../controllers/user.js";
import { isAuthinticated } from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";
import { log } from "console";


const router = express.Router();

router.post('/signup',upload.single("file"),createUser);
router.post('/login',loginUser);
router.get('/me', isAuthinticated,getMyProfile);
router.get('/logout', isAuthinticated,logout);
router.post('/file',upload.single("image"),isAuthinticated, fileUpload);
router.post('/sendmail',isAuthinticated, mailsend);



// router.get('/userid/:id', getUserById);
// router.put('/userid/:id', updateUser);
// router.delete('/userid/:id', deleteUser);

export default router;