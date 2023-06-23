import { app } from './app.js';
import { ConnectDB } from './data/database.js';
import dotenv from 'dotenv';

dotenv.config();


ConnectDB();
app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT} in ${process.env.NODE_ENV} Mode.` );
});