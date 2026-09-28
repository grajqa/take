import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/mongodb";
import CastingCall from "@/models/CastingCall";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectToDatabase();

    const { id } = req.query;

    if (typeof id !== "string") {
      return res.status(400).json({
        message: "Invalid casting call ID.",
      });
    }

    if (req.method === "PUT") {
      const updatedCastingCall = await CastingCall.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

      if (!updatedCastingCall) {
        return res.status(404).json({
          message: "Casting call not found.",
        });
      }

      return res.status(200).json(updatedCastingCall);
    }

    if (req.method === "DELETE") {
      const deletedCastingCall =
        await CastingCall.findByIdAndDelete(id);

      if (!deletedCastingCall) {
        return res.status(404).json({
          message: "Casting call not found.",
        });
      }

      return res.status(200).json({
        message: "Casting call deleted successfully.",
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