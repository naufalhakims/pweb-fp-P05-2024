import mongoose, { Schema, type Document } from "mongoose";

// Define the Feedback interface
export interface Feedback_ extends Document {
  name?: string; // Optional if feedback is anonymous
  is_anonymous: boolean; // Whether the feedback is anonymous
  email?: string; // Optional if feedback is anonymous
  message: string; // The content of the feedback
}

// Define the Feedback schema
const FeedbackSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: function (this: any) {
        return !this.is_anonymous; // Required only if feedback is not anonymous
      },
      validate: {
        validator: function (this: any, value: string) {
          // Name must be non-empty if feedback is not anonymous
          return this.is_anonymous || value?.trim().length > 0;
        },
        message: "Name is required unless feedback is anonymous",
      },
    },
    is_anonymous: { type: Boolean, required: true }, // Must always be provided
    email: {
      type: String,
      required: function (this: any) {
        return !this.is_anonymous; // Required only if feedback is not anonymous
      },
      validate: {
        validator: function (this: any, value: string) {
          // Email must be non-empty if feedback is not anonymous
          return this.is_anonymous || value?.trim().length > 0;
        },
        message: "Email is required unless feedback is anonymous",
      },
    },
    message: { type: String, required: true }, // Always required
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Export the Feedback model
export default mongoose.model<Feedback_>("Feedback", FeedbackSchema);