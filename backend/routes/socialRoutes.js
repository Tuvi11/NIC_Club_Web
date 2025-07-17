import express from 'express';
import { addSocial, getSocials, deleteSocial } from '../controllers/socialController.js';
import verifyToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getSocials);
router.post('/', verifyToken, addSocial);
router.delete('/:id', verifyToken, deleteSocial);

export default router;
