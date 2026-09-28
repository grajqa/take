import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/mongodb";
import Application from "@/models/Application";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectToDatabase();

    if (req.method === "GET") {
      const applications = await Application.find()
        .populate("castingCallId")
        .populate("talentId")
        .sort({ createdAt: -1 })
        .lean();

      return res.status(200).json(applications);
    }

    if (req.method === "POST") {
  const { castingCallId, talentId, message } = req.body;

  if (!castingCallId || !talentId || !message) {
    return res.status(400).json({
      message: "Casting call, talent, and message are required.",
    });
  }

  const application = await Application.create({
    castingCallId,
    talentId,
    message,
  });

  return res.status(201).json(application);
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