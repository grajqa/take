import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
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

      const talent = await Talent.findById(id);

      if (!talent) {
        return res.status(404).json({
          message: "Talent not found.",
        });
      }

      const isOwner = talent.userId.toString() === token.id;
      const isAdmin = token.role === "admin";

      if (!isOwner && !isAdmin) {
        return res.status(403).json({
          message: "You do not have permission to modify this profile.",
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

        return res.status(200).json(updatedTalent);
      }

      const deletedTalent = await Talent.findByIdAndDelete(id);

      return res.status(200).json({
        message: "Talent deleted successfully.",
        talent: deletedTalent,
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