import express from 'express';
import {
  getClubRecruitment,
  updateClubRecruitment,
  uploadTask,
  deleteTask,
  getDSARecruitment,
  updateDSARecruitment
} from '../controllers/recruitmentController.js';
import {upload} from '../middleware/upload.js'; // for file uploads

const router = express.Router();

// Club Recruitment
router.get('/club', getClubRecruitment);
router.post('/club/update', updateClubRecruitment);
router.post('/club/task', upload.single('file'), uploadTask);
router.delete('/club/task/:id', deleteTask);

// DSA Recruitment
router.get('/dsa', getDSARecruitment);
router.post('/dsa/update', updateDSARecruitment);

export default router;
