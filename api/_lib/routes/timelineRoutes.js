import express from 'express';
import { createEvent, getEvents, deleteEvent } from '../controllers/timelineController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.route('/').post(createEvent).get(getEvents);
router.route('/:id').delete(deleteEvent);

export default router;
