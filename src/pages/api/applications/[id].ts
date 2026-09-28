import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/mongodb";
import Application from "@/models/Application";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectToDatabase();

    const { id } = req.query;

    if (typeof id !== "string") {
      return res.status(400).json({
        message: "Invalid application ID.",
      });
    }

    if (req.method === "PUT") {
      const updatedApplication =
        await Application.findByIdAndUpdate(
          id,
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );

      if (!updatedApplication) {
        return res.status(404).json({
          message: "Application not found.",
        });
      }

      return res.status(200).json(updatedApplication);
    }

    if (req.method === "DELETE") {
      const deletedApplication =
        await Application.findByIdAndDelete(id);

      if (!deletedApplication) {
        return res.status(404).json({
          message: "Application not found.",
        });
      }

      return res.status(200).json({
        message: "Application deleted successfully.",
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