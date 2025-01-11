import mongoose, { Schema, Document, Model } from "mongoose";

// Define interface for the MockJob document
export interface IMockJob extends Document {
  jobPosition: string;
  jobDesc: string;
  jobExp: number;
  createdBy: string;
  createdAt: string;
  jsonMockResp: Record<string, any>;
}

// Define the schema for the MockJob
const MockJobSchema = new Schema<IMockJob>(
  {
    jobPosition: { type: String },
    jobDesc: { type: String },
    jobExp: { type: Number },
    createdBy: { type: String },
    createdAt: { type: String, default: () => new Date().toISOString() },
    jsonMockResp: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

// Initialize the model
const MockJob: Model<IMockJob> = mongoose.models.MockJob || mongoose.model<IMockJob>("MockJob", MockJobSchema);

export default MockJob;
