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
      title: "Fashion Campaign",
    });

    if (!castingCall) {
      return res.status(404).json({
        message: "Casting call not found.",
      });
    }

    const updatedCastingCall =
      await CastingCall.findByIdAndUpdate(
        castingCall._id,
        {
          title: "Updated Fashion Campaign",
          compensation: "€500",
        },
        {
          new: true,
          runValidators: true,
        }
      );

    return res.status(200).json(updatedCastingCall);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Something went wrong.",
    });
  }
}