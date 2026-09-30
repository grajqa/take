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

    if (req.method === "GET") {
      const talents = await Talent.find()
        .populate("userId", "name email image")
        .sort({ createdAt: -1 })
        .lean();

      return res.status(200).json(talents);
    }

    if (req.method === "POST") {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });

      if (!token?.id) {
        return res.status(401).json({
          message: "You must be logged in to save a talent profile.",
        });
      }

      const {
        category,
        location,
        bio,
        experience,
        portfolio,
      } = req.body;

      if (!category || !location) {
        return res.status(400).json({
          message: "Category and location are required.",
        });
      }

      const existingTalent = await Talent.findOne({
        userId: token.id,
      });

      if (existingTalent) {
        existingTalent.category = category;
        existingTalent.location = location;
        existingTalent.bio = bio || "";
        existingTalent.experience = experience || "";
        existingTalent.portfolio = Array.isArray(portfolio)
          ? portfolio
          : [];

        await existingTalent.save();

        return res.status(200).json(existingTalent);
      }

      const talent = await Talent.create({
        userId: token.id,
        category,
        location,
        bio: bio || "",
        experience: experience || "",
        portfolio: Array.isArray(portfolio) ? portfolio : [],
      });

      return res.status(201).json(talent);
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