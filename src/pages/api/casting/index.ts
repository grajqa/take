import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/mongodb";
import CastingCall from "@/models/CastingCall";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectToDatabase();

    if (req.method === "GET") {
      const castingCalls = await CastingCall.find()
        .sort({ createdAt: -1 })
        .lean();

      return res.status(200).json(castingCalls);
    }

    if (req.method === "POST") {
  const {
    title,
    description,
    category,
    location,
    deadline,
    createdBy,
  } = req.body;

  if (
    !title ||
    !description ||
    !category ||
    !location ||
    !deadline ||
    !createdBy
  ) {
    return res.status(400).json({
      message: "All required casting fields must be provided.",
    });
  }

  const castingCall = await CastingCall.create({
    title,
    description,
    category,
    location,
    deadline,
    compensation: req.body.compensation,
    createdBy,
  });

  return res.status(201).json(castingCall);
}

    return res.status(405).json({
      message: "Method not allowed",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Something went wrong.",
    });
  }
}