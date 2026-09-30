import mongoose, { Schema } from "mongoose";
import "@/models/User";

const TalentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    category: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    bio: {
      type: String,
      default: "",
    },

    experience: {
      type: String,
      default: "",
    },

    portfolio: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Talent =
  mongoose.models.Talent || mongoose.model("Talent", TalentSchema);

export default Talent;