import mongoose, { Schema, Document } from 'mongoose';

export interface Comment extends Document {
  message: string;
  user: mongoose.Types.ObjectId;
  crowdfund: mongoose.Types.ObjectId;
}

const CommentSchema: Schema = new Schema({
  message: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  crowdfund: { type: Schema.Types.ObjectId, ref: 'Crowdfund', required: true },
});

export default mongoose.model<Comment>('Comment', CommentSchema);