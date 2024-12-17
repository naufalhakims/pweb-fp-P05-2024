import { Schema, model } from 'mongoose';

const feedbackSchema = new Schema({
  name: { type: String, required: true },
  is_anonymous: { type: Boolean, required: true },
  email: { type: String, required: false },
  message: { type: String, required: true },
});

export default model('Feedback', feedbackSchema);
