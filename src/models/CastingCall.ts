import mongoose, { Schema } from "mongoose";

const CastingCallSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    deadline: {
      type: Date,
      required: true,
    },

    compensation: {
      type: String,
      default: "Not specified",
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },
  },
  {
    timestamps: true,
  }
);

const CastingCall =
  mongoose.models.CastingCall ||
  mongoose.model("CastingCall", CastingCallSchema);

export default CastingCall;