import { Router } from 'express';
import { submitFeedback, getFeedbacks } from '../controllers/feedbackController';

const router = Router();

router.post('/', submitFeedback);
router.get('/', getFeedbacks);

export default router;
