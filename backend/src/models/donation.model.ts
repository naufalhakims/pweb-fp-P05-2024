import mongoose, { Schema, Document } from 'mongoose';
import { PaymentMethod } from './enums';

export interface Donation_ extends Document {
  payment_method: PaymentMethod;
  amount: number;
  crowdfund: mongoose.Types.ObjectId;
}

const DonationSchema: Schema = new Schema({
  payment_method: { type: String, enum: Object.values(PaymentMethod), required: true },
  amount: { type: Number, required: true },
  crowdfund: { type: Schema.Types.ObjectId, ref: 'Crowdfund', required: true },
});

export default mongoose.model<Donation_>('Donation', DonationSchema);