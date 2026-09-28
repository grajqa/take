import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/mongodb";
import CastingCall from "@/models/CastingCall";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectToDatabase();

    const castingCall = await CastingCall.create({
      title: "Fashion Campaign",
      description: "Model needed for an upcoming fashion campaign.",
      category: "Fashion",
      location: "Prishtina",
      deadline: new Date("2026-10-05"),
      compensation: "Paid opportunity",
      createdBy: "6ab3a53ffcd5613d31f627ba",
      status: "open",
    });

    return res.status(201).json(castingCall);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Something went wrong.",
    });
  }
}