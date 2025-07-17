import express from 'express';
import { addEvent, getEvents, deleteEvent } from '../controllers/eventController.js';
import verifyToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getEvents); 
router.post('/', verifyToken, addEvent); 
router.delete('/:id', verifyToken, deleteEvent); 

export default router;
