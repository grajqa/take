import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/mongodb";
import Talent from "@/models/Talent";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectToDatabase();

    const talent = await Talent.create({
      userId: "6ab3a53ffcd5613d31f627ba",
      category: "Models",
      location: "Prishtina",
      bio: "Creative professional available for fashion and commercial projects.",
      experience: "2 years",
      portfolio: [],
    });

    return res.status(201).json(talent);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Something went wrong.",
    });
  }
}