import { RequestHandler } from 'express';
import CrowdfundService from '@/services/crowdfund.service';
import formatResponse from '@/utils/formatResponse';
import { Types } from 'mongoose';
import { CustomRequest } from '@/middleware/auth';

class CrowdfundController {
  /**
   * Admin: Get all crowdfunds.
   * GET /admin
   */
  public getAllCrowdfundsAdmin: RequestHandler = async (req: CustomRequest, res, next) => {
    const admin_id = req.user?.id;

    if (!admin_id) {
      res.status(401).json(formatResponse('failed', 'Unauthorized'));
      return;
    }

    try {
      const crowdfunds = await CrowdfundService.getAllCrowdfundsAdmin();
      res
        .status(200)
        .json(formatResponse('success', 'All crowdfunds fetched successfully', crowdfunds));
    } catch (error: any) {
      res.status(500).json(formatResponse('error', error.message || 'Internal Server Error'));
    }
  };

  /**
   * Admin: Get crowdfund details by ID.
   * GET /admin/:crowdfund_id
   */
  public getCrowdfundDetailsAdmin: RequestHandler = async (req: CustomRequest, res, next) => {
    const { crowdfund_id } = req.params;
    const admin_id = req.user?.id;

    if (!admin_id) {
      res.status(401).json(formatResponse('failed', 'Unauthorized'));
      return;
    }

    try {
      const crowdfund = await CrowdfundService.getCrowdfundById(crowdfund_id);
      if (!crowdfund) {
        res.status(404).json(formatResponse('failed', 'Crowdfund not found'));
        return;
      }
      res
        .status(200)
        .json(formatResponse('success', 'Crowdfund details fetched successfully', crowdfund));
    } catch (error: any) {
      res.status(500).json(formatResponse('error', error.message || 'Internal Server Error'));
    }
  };

  /**
   * Admin: Create a new crowdfund.
   * POST /admin/create
   */
  public createCrowdfundAdmin: RequestHandler = async (req: CustomRequest, res, next) => {
    const { name, target } = req.body;
    const admin_id_str = req.user?.id;

    if (!admin_id_str) {
      res.status(401).json(formatResponse('failed', 'Unauthorized'));
      return;
    }

    try {
      const admin_id = new Types.ObjectId(admin_id_str);

      const crowdfundInput = {
        name,
        target,
        admin_id,
      };
      const newCrowdfund = await CrowdfundService.createCrowdfund(crowdfundInput);
      res
        .status(201)
        .json(formatResponse('success', 'Crowdfund created successfully', newCrowdfund));
    } catch (error: any) {
      res
        .status(500)
        .json(formatResponse('error', error.message || 'Internal Server Error'));
    }
  };

  /**
   * Admin: Edit a crowdfund.
   * PUT /admin/:crowdfund_id/edit
   */
  public editCrowdfundAdmin: RequestHandler = async (req: CustomRequest, res, next) => {
    const { crowdfund_id } = req.params;
    const { name, target, status } = req.body;
    const admin_id = req.user?.id;

    if (!admin_id) {
      res.status(401).json(formatResponse('failed', 'Unauthorized'));
      return;
    }

    try {
      const updateInput: any = {};
      if (name) updateInput.name = name;
      if (target) updateInput.target = target;
      if (status) updateInput.status = status;

      const updatedCrowdfund = await CrowdfundService.editCrowdfund(crowdfund_id, updateInput);
      res
        .status(200)
        .json(formatResponse('success', 'Crowdfund edited successfully', updatedCrowdfund));
    } catch (error: any) {
      res.status(500).json(formatResponse('error', error.message || 'Internal Server Error'));
    }
  };

  /**
   * Admin: Delete a crowdfund.
   * DELETE /admin/:crowdfund_id
   */
  public deleteCrowdfundAdmin: RequestHandler = async (req: CustomRequest, res, next) => {
    const { crowdfund_id } = req.params;
    const admin_id = req.user?.id;

    if (!admin_id) {
      res.status(401).json(formatResponse('failed', 'Unauthorized'));
      return;
    }

    try {
      const deletedCrowdfund = await CrowdfundService.deleteCrowdfund(crowdfund_id);
      res
        .status(200)
        .json(formatResponse('success', 'Crowdfund deleted successfully', deletedCrowdfund));
    } catch (error: any) {
      res.status(500).json(formatResponse('error', error.message || 'Internal Server Error'));
    }
  };

  /**
   * Admin: Get all comments on a crowdfund.
   * GET /admin/:crowdfund_id/comment
   */
  public getCommentsOnCrowdfund: RequestHandler = async (req: CustomRequest, res, next) => {
    const { crowdfund_id } = req.params;
    const admin_id = req.user?.id;

    if (!admin_id) {
      res.status(401).json(formatResponse('failed', 'Unauthorized'));
      return;
    }

    try {
      const comments = await CrowdfundService.getCommentsByCrowdfundId(crowdfund_id);
      
      if (!comments) {
        res.status(200).json(formatResponse('success', 'No comments found for this crowdfund'));
        return;
      }

      res
        .status(200)
        .json(formatResponse('success', 'Comments fetched successfully', comments));
    } catch (error: any) {
      console.error('Error fetching comments:', error); // Added logging for debugging
      res.status(500).json(formatResponse('error', error.message || 'Internal Server Error'));
    }
  };

  /**
   * Admin: Delete a comment from a crowdfund.
   * DELETE /admin/:crowdfund_id/comment/:comment_id
   */
  public deleteCommentAdmin: RequestHandler = async (req: CustomRequest, res, next) => {
    const { crowdfund_id, comment_id } = req.params;
    const admin_id = req.user?.id;

    if (!admin_id) {
      res.status(401).json(formatResponse('failed', 'Unauthorized'));
      return;
    }

    try {
      const deletedComment = await CrowdfundService.deleteComment(crowdfund_id, comment_id);
      res
        .status(200)
        .json(formatResponse('success', 'Comment deleted successfully', deletedComment));
    } catch (error: any) {
      res.status(500).json(formatResponse('error', error.message || 'Internal Server Error'));
    }
  };
  public getAllCrowdfunds: RequestHandler = async (req: CustomRequest, res, next) => {
    try {
      const crowdfunds = await CrowdfundService.getAllCrowdfunds();
      res
        .status(200)
        .json(formatResponse('success', 'All crowdfunds fetched successfully', crowdfunds));
    } catch (error: any) {
      res.status(500).json(formatResponse('error', error.message || 'Internal Server Error'));
    }
  };

}

export default new CrowdfundController();