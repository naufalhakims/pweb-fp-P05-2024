import mongoose, { Types } from 'mongoose';
import Crowdfund from '../models/crowdfund.model';
import FavoriteCrowdfund from '../models/favoritecrowdfund.model';
import Comment from '../models/comment.model';
import Donation from '../models/donation.model';
import { CrowdfundStatus, PaymentMethod } from '../models/enums';

interface CreateCrowdfundInput {
  name: string;
  target: string;
  admin_id: Types.ObjectId;
}

interface EditCrowdfundInput {
  name?: string;
  target?: string;
  status?: CrowdfundStatus;
}

interface CreateDonationInput {
  crowdfund_id: string;
  payment_method: PaymentMethod;
  amount: number;
  user_id: string;
  bank_name?: string;
}

class CrowdfundService {
  // User Start
  /**
   * Fetch all open crowdfunds.
   */
  async getAllCrowdfunds() {
    try {
      const crowdfunds = await Crowdfund.find({ status: CrowdfundStatus.OPEN });
      return crowdfunds;
    } catch (error) {
      throw new Error('Error fetching crowdfunds');
    }
  }
  // User End

  // Admin Start
  /**
   * Get all crowdfunds.
   */
  async getAllCrowdfundsAdmin() {
    try {
      const crowdfunds = await Crowdfund.find();
      return crowdfunds;
    } catch (error) {
      throw new Error('Error fetching all crowdfunds');
    }
  }

  /**
   * Fetch crowdfund details by ID with populated favorites and comments.
   */
  async getCrowdfundById(crowdfund_id: string) {
    try {
      const crowdfund = await Crowdfund.findById(crowdfund_id)
        .populate({
          path: 'favorite_crowdfund',
          populate: { path: 'user_id', select: 'name' },
        })
        .populate({
          path: 'comments',
          populate: { path: 'user', select: 'name' },
        });
      if (!crowdfund) {
        throw new Error('Crowdfund not found');
      }
      return crowdfund;
    } catch (error) {
      throw new Error('Error fetching crowdfund details');
    }
  }

  /**
   * Create a new crowdfund.
   */
  async createCrowdfund(input: CreateCrowdfundInput) {
    try {
      const newCrowdfund = new Crowdfund({
        name: input.name,
        target: input.target,
        current_donation: 0,
        status: CrowdfundStatus.OPEN,
        created_at: new Date(),
        admin_id: input.admin_id,
      });
      const savedCrowdfund = await newCrowdfund.save();
      return savedCrowdfund;
    } catch (error) {
      throw new Error('Error creating crowdfund');
    }
  }

  /**
   * Update an existing crowdfund.
   */
  async editCrowdfund(crowdfund_id: string, input: EditCrowdfundInput) {
    try {
      const updatedCrowdfund = await Crowdfund.findByIdAndUpdate(
        crowdfund_id,
        { $set: input },
        { new: true }
      );
      if (!updatedCrowdfund) {
        throw new Error('Crowdfund not found');
      }
      return updatedCrowdfund;
    } catch (error) {
      throw new Error('Error updating crowdfund');
    }
  }

  /**
   * Delete a crowdfund.
   */
  async deleteCrowdfund(crowdfund_id: string) {
    try {
      const deletedCrowdfund = await Crowdfund.findByIdAndDelete(crowdfund_id);
      if (!deletedCrowdfund) {
        throw new Error('Crowdfund not found');
      }
      await FavoriteCrowdfund.deleteMany({ crowdfund_id });
      await Comment.deleteMany({ crowdfund: crowdfund_id });
      await Donation.deleteMany({ crowdfund: crowdfund_id });
      return deletedCrowdfund;
    } catch (error) {
      throw new Error('Error deleting crowdfund');
    }
  }

  /**
   * Create a donation for a crowdfund.
   */
  async createDonation(input: CreateDonationInput) {
    try {
      const crowdfund = await Crowdfund.findById(input.crowdfund_id);
      if (!crowdfund) {
        throw new Error('Crowdfund not found');
      }

      const donation = new Donation({
        payment_method: input.payment_method,
        amount: input.amount,
        crowdfund: input.crowdfund_id,
        // Optionally, include bank_name if payment_method is BANK_TRANSFER
      });

      const savedDonation = await donation.save();

      // Update current_donation
      crowdfund.current_donation += input.amount;
      await crowdfund.save();

      return savedDonation;
    } catch (error) {
      throw new Error('Error creating donation');
    }
  }

  /**
   * Get all comments for a crowdfund.
   */
  async getComments(crowdfund_id: string) {
    try {
      const comments = await Comment.find({ crowdfund: crowdfund_id })
        .populate('user', 'name')
        .exec();
      return comments;
    } catch (error) {
      throw new Error('Error fetching comments');
    }
  }

  /**
   * Delete a comment from a crowdfund.
   */
  async deleteComment(crowdfund_id: string, comment_id: string) {
    try {
      // Verify the crowdfund exists
      const crowdfund = await Crowdfund.findById(crowdfund_id);
      if (!crowdfund) {
        throw new Error('Crowdfund not found');
      }

      // Delete the comment
      const deletedComment = await Comment.findByIdAndDelete(comment_id);
      if (!deletedComment) {
        throw new Error('Comment not found');
      }

      // Remove the comment reference from the crowdfund
      crowdfund.comments = crowdfund.comments.filter(
        (id) => id.toString() !== comment_id
      );
      await crowdfund.save();

      return deletedComment;
    } catch (error: any) {
      throw new Error(`Error deleting comment: ${error.message}`);
    }
  }
  // Admin End
}

export default new CrowdfundService();