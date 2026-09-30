import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
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

    if (req.method === "GET") {
      const castingCall = await CastingCall.findById(id).lean();

      if (!castingCall) {
        return res.status(404).json({
          message: "Casting call not found.",
        });
      }

      return res.status(200).json(castingCall);
    }

    if (req.method === "PUT" || req.method === "DELETE") {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });

      if (!token?.id) {
        return res.status(401).json({
          message: "You must be logged in.",
        });
      }

      const castingCall = await CastingCall.findById(id);

      if (!castingCall) {
        return res.status(404).json({
          message: "Casting call not found.",
        });
      }

      const isOwner = castingCall.createdBy.toString() === token.id;
      const isAdmin = token.role === "admin";

      if (!isOwner && !isAdmin) {
        return res.status(403).json({
          message: "You do not have permission to modify this casting.",
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

        return res.status(200).json(updatedCastingCall);
      }

      await CastingCall.findByIdAndDelete(id);

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