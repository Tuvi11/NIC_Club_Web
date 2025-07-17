import express from 'express';
import multer from 'multer';
import path from 'path';
import { addMember, getMembers, deleteMember } from '../controllers/memberController.js';
import verifyToken from '../middleware/authMiddleware.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });




router.get('/', getMembers);

router.post('/', verifyToken, upload.single('photo'), addMember);
router.delete('/:id', verifyToken, deleteMember);

export default router;
