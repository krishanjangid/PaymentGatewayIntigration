import express from 'express';
import userRouter from './routes/user.js';
import taskRouter from './routes/task.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

export const app = express();

//using middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors(
    {
        methods: ['GET','POST','PUT','DELETE'],
        credentials: true,
    }
));

app.use('/api/v1/users',userRouter);
app.use('/api/v1/task',taskRouter);
app.get('/', (req, res) => {
    res.send("Hello World");
});
app.get('/paymentvarification', (req, res) => {
    console.log(req.body);
});




























