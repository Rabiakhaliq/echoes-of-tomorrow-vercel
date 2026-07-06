import express from 'express';
import {
  createLetter,
  getLetters,
  getLetterById,
  updateLetter,
  deleteLetter,
} from '../controllers/letterController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.route('/').post(createLetter).get(getLetters);
router.route('/:id').get(getLetterById).put(updateLetter).delete(deleteLetter);

export default router;
