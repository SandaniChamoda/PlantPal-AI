import { Request, Response } from "express";
import { AIServiceError, generateChatResponse } from "../services/ai.service";
import { buildKnowledgeContext } from "../services/knowledge.service";

export const chatWithPlantPal = async (req: Request, res: Response) => {
  try {
    const message = String(req.body.message || "");
    const instructions = String(req.body.instructions || "");
    const knowledgeContext = buildKnowledgeContext();

    const reply = await generateChatResponse({
      userMessage: message,
      customInstructions: instructions,
      knowledgeContext,
    });

    return res.json({
      success: true,
      reply,
      knowledgeUsed: knowledgeContext !== "No uploaded knowledge yet.",
    });
  } catch (error: unknown) {
    const statusCode = error instanceof AIServiceError ? error.statusCode : 500;
    const message = error instanceof Error ? error.message : "Chat request failed";

    return res.status(statusCode).json({
      success: false,
      message,
    });
  }
};
