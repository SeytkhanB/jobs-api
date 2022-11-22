import mongoose from "mongoose";
const { Schema } = mongoose;

const JobSchema = new Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide company name"],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "Please provide position"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      required: [true, "Please provide user"],
      ref: "User", // we reference to "User" module. we are tying "Job" to "User"
    },
  },
  { timestamps: true } // mongoose will automatically add "ceratedAt" and "updatedAt"
);

export default mongoose.model("Job", JobSchema);
