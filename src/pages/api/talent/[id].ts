import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/mongodb";
import Talent from "@/models/Talent";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectToDatabase();

    const { id } = req.query;

    if (typeof id !== "string") {
      return res.status(400).json({
        message: "Invalid talent ID.",
      });
    }

    if (req.method === "PUT") {
      const updatedTalent = await Talent.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

      if (!updatedTalent) {
        return res.status(404).json({
          message: "Talent not found.",
        });
      }

      return res.status(200).json(updatedTalent);
    }

    if (req.method === "DELETE") {
      const deletedTalent = await Talent.findByIdAndDelete(id);

      if (!deletedTalent) {
        return res.status(404).json({
          message: "Talent not found.",
        });
      }

      return res.status(200).json({
        message: "Talent deleted successfully.",
      });
    }

    return res.status(405).json({
      message: "Method not allowed.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Something went wrong.",
    });
  }
}