import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.config.js';

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'mern_uploads', // folder name in Cloudinary
    allowed_formats: [
      'jpg', 'jpeg', 'png', 'gif', 'mp4',      // images/videos
      'pdf', 'doc', 'docx', 'ppt', 'pptx',    // documents
      'txt', 'xls', 'xlsx'                     // optional additional formats
    ],
  },
});

const upload = multer({ storage });

export default upload;
