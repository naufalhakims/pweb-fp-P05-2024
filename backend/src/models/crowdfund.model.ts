import mongoose, { Schema, Document, Types } from 'mongoose';
import { CrowdfundStatus } from './enums';

export interface Crowdfund_ extends Document {
  name: string;
  target: string;
  current_donation: number;
  status: CrowdfundStatus;
  created_at: Date;
  favorite_crowdfund: Types.ObjectId[]; 
  comments: Types.ObjectId[]; 
}

const CrowdfundSchema: Schema = new Schema({
  name: { type: String, required: true },
  target: { type: String, required: true },
  current_donation: { type: Number, default: 0 },
  status: { type: String, enum: Object.values(CrowdfundStatus), default: CrowdfundStatus.OPEN },
  created_at: { type: Date, default: Date.now },
  favorite_crowdfund: [{
    type: Schema.Types.ObjectId,
    ref: 'FavoriteCrowdfund',
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  }],
});

export default mongoose.model<Crowdfund_>('Crowdfund', CrowdfundSchema);