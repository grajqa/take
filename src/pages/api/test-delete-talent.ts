import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/mongodb";
import Talent from "@/models/Talent";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectToDatabase();

    const talent = await Talent.findOne({
      category: "Models",
    });

    if (!talent) {
      return res.status(404).json({
        message: "Talent not found.",
      });
    }

    await Talent.findByIdAndDelete(talent._id);

    return res.status(200).json({
      message: "Talent deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Something went wrong.",
    });
  }
}