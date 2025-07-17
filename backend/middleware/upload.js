import multer from 'multer';
import path from 'path';

// Storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // store in /uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // e.g. 172028931291.jpg
  },
});

// File filter (optional: to accept only images)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb('Only image files are allowed!', false);
  }
};

export const upload = multer({ storage, fileFilter });
