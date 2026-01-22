import { Request, Response } from "express";
import { getAllIssues } from "../services/issues.service";

export async function getIssues(req: Request, res: Response) {
  try {
    const issues = await getAllIssues();

    res.status(200).json({
      success: true,
      data: issues,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch issues",
    });
  }
}
