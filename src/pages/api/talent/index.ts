import type { NextApiRequest, NextApiResponse } from "next";
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
  const {
    userId,
    category,
    location,
    bio,
    experience,
    portfolio,
  } = req.body;

  if (!userId || !category || !location) {
    return res.status(400).json({
      message: "User, category, and location are required.",
    });
  }

  const talent = await Talent.create({
    userId,
    category,
    location,
    bio,
    experience,
    portfolio,
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