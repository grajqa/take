import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/mongodb";
import Application from "@/models/Application";
import { getSession } from "next-auth/react";
import Talent from "@/models/Talent";

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
      const session = await getSession({ req });

    if (!session?.user?.id) {
      return res.status(401).json({
        message: "You must be logged in to submit an application.",
      });
    }
  const { castingCallId, message } = req.body;

    const talent = await Talent.findOne({
      userId: session.user.id,
    });

    if (!talent) {
      return res.status(404).json({
        message: "Talent profile not found.",
      });
    }

      if (!castingCallId || !message) {
      return res.status(400).json({
        message: "Casting call and message are required.",
      });
    }

  const application = await Application.create({
    castingCallId,
    talentId: talent._id,
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