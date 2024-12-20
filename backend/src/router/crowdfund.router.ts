import CrowdfundController from '@/controllers/crowdfund.controller';
import { authMiddleware } from '@/middleware/auth';
import { adminMiddleware } from '@/middleware/admin';
import { Router } from 'express';

const router: Router = Router();

// Admin Routes
router.get('/admin', adminMiddleware, CrowdfundController.getAllCrowdfundsAdmin);
router.get('/admin/:crowdfund_id', adminMiddleware, CrowdfundController.getCrowdfundDetailsAdmin);
router.get('/admin/:crowdfund_id/comment', adminMiddleware, CrowdfundController.getCommentsOnCrowdfund);
router.post('/admin/create', adminMiddleware, CrowdfundController.createCrowdfundAdmin);
router.put('/admin/edit/:crowdfund_id', adminMiddleware, CrowdfundController.editCrowdfundAdmin);
router.delete('/admin/delete/:crowdfund_id', adminMiddleware, CrowdfundController.deleteCrowdfundAdmin);
router.delete('/admin/delete/:crowdfund_id/comment/:comment_id', adminMiddleware, CrowdfundController.deleteCommentAdmin);

export default router;