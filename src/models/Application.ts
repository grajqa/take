import mongoose, { Schema } from "mongoose";

const ApplicationSchema = new Schema(
  {
    castingCallId: {
      type: Schema.Types.ObjectId,
      ref: "CastingCall",
      required: true,
    },

    talentId: {
      type: Schema.Types.ObjectId,
      ref: "Talent",
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Application =
  mongoose.models.Application ||
  mongoose.model("Application", ApplicationSchema);

export default Application;