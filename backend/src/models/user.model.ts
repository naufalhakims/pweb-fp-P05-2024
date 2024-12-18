import mongoose, { Schema, type Document } from "mongoose";
import { UserRole } from "./enums";

export interface User_ extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: UserRole.USER },
});

export default mongoose.model<User_>("Auth", UserSchema);