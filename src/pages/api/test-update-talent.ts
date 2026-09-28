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

    const updatedTalent = await Talent.findByIdAndUpdate(
      talent._id,
      {
        experience: "3 years",
        bio: "Updated creative professional profile.",
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json(updatedTalent);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Something went wrong.",
    });
  }
}