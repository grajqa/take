import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/mongodb";
import CastingCall from "@/models/CastingCall";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectToDatabase();

    const castingCall = await CastingCall.findOne({
      title: "Updated Fashion Campaign",
    });

    if (!castingCall) {
      return res.status(404).json({
        message: "Casting call not found.",
      });
    }

    await CastingCall.findByIdAndDelete(castingCall._id);

    return res.status(200).json({
      message: "Casting call deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Something went wrong.",
    });
  }
}