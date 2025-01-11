import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  email: string; // Acts as the unique identifier for users
  question: string;
  correctAnswer: string;
  userAnswer?: string;
  rating?: number;
  feedback?: string;
  createdAt?: Date;
  mockId?: any; // Accepts any type
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true }, // Email acts as a reference field
  question: { type: String, required: true },
  correctAnswer: { type: String, required: true },
  userAnswer: { type: String },
  rating: { type: Number },
  feedback: { type: String },
  createdAt: { type: Date, default: Date.now },
  mockId: { type: Schema.Types.Mixed, index: true }, // Allows any type
});

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
