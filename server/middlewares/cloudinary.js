import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();
cloudinary.config({ 
    cloud_name: process.env.CLOUDI_NAME, 
    api_key: process.env.CLOUDI_API, 
    api_secret: process.env.CLOUDI_API_SECRET 
  });

export default cloudinary;

  