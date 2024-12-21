import FeedbackService from "@/services/feedback.service";
import formatResponse from "@/utils/formatResponse";
import { RequestHandler } from "express";

class FeedbackController {
  /**
   * Get all feedbacks
   */
  public getFeedbacks: RequestHandler = async (req, res, next) => {
    try {
      const feedbacks = await FeedbackService.getFeedbacks();
      res
        .status(200)
        .json(formatResponse("success", "Feedbacks retrieved successfully", feedbacks));
    } catch (error: any) {
      next(error);
    }
  };

  /**
   * Get feedback by ID
   */
  public getFeedbackById: RequestHandler = async (req, res, next) => {
    try {
      const feedback = await FeedbackService.getFeedbackById(req.params.id);
      res
        .status(200)
        .json(formatResponse("success", "Feedback retrieved successfully", feedback));
    } catch (error: any) {
      next(error);
    }
  };

  /**
   * Add new feedback
   */
  public addFeedback: RequestHandler = async (req, res, next) => {
    try {
      const feedback = await FeedbackService.addFeedback(req.body);
      res
        .status(201)
        .json(formatResponse("success", "Feedback added successfully", feedback));
    } catch (error: any) {
      next(error);
    }
  };

  /**
   * Modify feedback by ID
   */
  public modifyFeedback: RequestHandler = async (req, res, next) => {
    try {
      const feedback = await FeedbackService.modifyFeedback(req.params.id, req.body);
      res
        .status(200)
        .json(formatResponse("success", "Feedback updated successfully", feedback));
    } catch (error: any) {
      next(error);
    }
  };

  /**
   * Delete feedback by ID
   */
  public deleteFeedback: RequestHandler = async (req, res, next) => {
    try {
      const feedback = await FeedbackService.deleteFeedback(req.params.id);
      res
        .status(200)
        .json(formatResponse("success", "Feedback deleted successfully", feedback));
    } catch (error: any) {
      next(error);
    }
  };
}

export default new FeedbackController();