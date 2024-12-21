import type { Feedback_ } from "@/models/feedback.model";
import Feedback from "@/models/feedback.model";
import { isValidObjectId } from "mongoose";

export class FeedbackService {
  /**
   * Add a new feedback
   * @param feedbackData - Feedback object to be saved
   * @returns Saved Feedback object
   */
  async addFeedback(feedbackData: Feedback_): Promise<Feedback_> {
    const feedback = new Feedback(feedbackData);
    return await feedback.save();
  }

  /**
   * Get all feedbacks
   * @returns List of all Feedbacks
   */
  async getFeedbacks(): Promise<Feedback_[]> {
    return await Feedback.find();
  }

  /**
   * Get a feedback by ID
   * @param id - Feedback ID
   * @returns Feedback object if found
   * @throws Error if ID is invalid or feedback not found
   */
  async getFeedbackById(id: string | null): Promise<Feedback_> {
    if (!isValidObjectId(id)) {
      throw new Error(`Invalid ID... - ${id}`);
    }
    const feedback = await Feedback.findById(id);
    if (!feedback) {
      throw new Error(`Feedback not found... - ${id}`);
    }
    return feedback;
  }

  /**
   * Update a feedback by ID
   * @param id - Feedback ID
   * @param feedbackData - Updated Feedback object
   * @returns Updated Feedback object if found
   * @throws Error if ID is invalid or feedback not found
   */
  async modifyFeedback(id: string, feedbackData: Feedback_): Promise<Feedback_> {
    if (!isValidObjectId(id)) {
      throw new Error(`Invalid ID... - ${id}`);
    }
    const updatedFeedback = await Feedback.findByIdAndUpdate(id, feedbackData, {
      new: true,
    });
    if (!updatedFeedback) {
      throw new Error(`Feedback not found... - ${id}`);
    }
    return updatedFeedback;
  }

  /**
   * Delete a feedback by ID
   * @param id - Feedback ID
   * @returns Deleted Feedback object if found
   * @throws Error if ID is invalid or feedback not found
   */
  async deleteFeedback(id: string): Promise<Feedback_> {
    if (!isValidObjectId(id)) {
      throw new Error(`Invalid ID... - ${id}`);
    }
    const deletedFeedback = await Feedback.findByIdAndDelete(id);
    if (!deletedFeedback) {
      throw new Error(`Feedback not found... - ${id}`);
    }
    return deletedFeedback;
  }
}

export default new FeedbackService();