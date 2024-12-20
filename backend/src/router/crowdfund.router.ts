import CrowdfundController from '@/controllers/crowdfund.controller';
import { authMiddleware } from '@/middleware/auth';
import { Router } from 'express';

const router: Router = Router();

// Admin Routes
router.get('/admin', authMiddleware, CrowdfundController.getAllCrowdfundsAdmin);
router.get('/admin/:crowdfund_id', authMiddleware, CrowdfundController.getCrowdfundDetailsAdmin);
router.post('/admin/create', authMiddleware, CrowdfundController.createCrowdfundAdmin);
router.put('/admin/edit/:crowdfund_id', authMiddleware, CrowdfundController.editCrowdfundAdmin);
router.delete('/admin/delete/:crowdfund_id', authMiddleware, CrowdfundController.deleteCrowdfundAdmin);
router.delete('/admin/delete/:crowdfund_id/comment/:comment_id', authMiddleware, CrowdfundController.deleteCommentAdmin);

export default router;