import express from 'express';
import { addMoodEntry, getMoodHistory } from '../controllers/moodController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.route('/').post(addMoodEntry).get(getMoodHistory);

export default router;
