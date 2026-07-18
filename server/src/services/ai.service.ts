// server/src/services/ai.service.ts
import "dotenv/config";
import Groq from "groq-sdk";

export class AIServiceError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.name = "AIServiceError";
    this.statusCode = statusCode;
  }
}

const groqApiKey = process.env.GROQ_API_KEY;

if (!groqApiKey) {
  console.error("❌ GROQ_API_KEY is missing in .env file");
  throw new Error("Missing GROQ_API_KEY in environment variables.");
}

console.log("✅ Groq API Key found, initializing...");

const groq = new Groq({ 
  apiKey: groqApiKey
});

const model = "openai/gpt-oss-120b";        // Recommended replacement

const sanitizeText = (value: string) => value.replace(/\s+/g, " ").trim();

export async function analyzePDF(text: string, knowledgeType: string) {
  const sanitizedText = sanitizeText(text);

  if (!sanitizedText) {
    throw new AIServiceError("No readable text found in PDF.", 400);
  }

  const trimmedText = sanitizedText.slice(0, 8000);
  
  try {
    const response = await groq.chat.completions.create({
      model: model,
      messages: [
        {
          role: "system",
          content: "You are an expert botany document analyst. Return responses in clean markdown format with headers and bullet points."
        },
        {
          role: "user",
          content: `Analyze this plant knowledge PDF:
Knowledge Type: ${knowledgeType}

Document:
${trimmedText}

Return exactly in this format:
## Summary
2-4 concise sentences

## Important Points
- bullet point
- bullet point

## Key Information
- bullet point
- bullet point`
        }
      ],
      temperature: 0.3,
      max_tokens: 1000,
    });

    return response.choices[0]?.message?.content || "";
  } catch (error: any) {
    console.error("Groq API Error:", error);
    throw new AIServiceError(
      error.message || "Groq API request failed",
      502
    );
  }
}

type ChatInput = {
  userMessage: string;
  customInstructions?: string;
  knowledgeContext: string;
};

export async function generateChatResponse({
  userMessage,
  customInstructions,
  knowledgeContext,
}: ChatInput) {
  const question = sanitizeText(userMessage);

  if (!question) {
    throw new AIServiceError("Message cannot be empty.", 400);
  }

  const instructions = sanitizeText(customInstructions || "");
  const knowledge = sanitizeText(knowledgeContext || "No uploaded knowledge yet.");

  try {
    const response = await groq.chat.completions.create({
      model: model,
      messages: [
        {
          role: "system",
          content: "You are PlantPal AI, a friendly plant-care assistant. Be practical, safe, and concise. If uncertain, say so and suggest what to check next."
        },
        {
          role: "system",
          content: `Custom instructions from user: ${instructions || "None"}`
        },
        {
          role: "system",
          content: `Knowledge base context:\n${knowledge}`
        },
        {
          role: "user",
          content: question
        }
      ],
      temperature: 0.7,
      max_tokens: 800,
    });

    return response.choices[0]?.message?.content || "";
  } catch (error: any) {
    console.error("Groq API Error:", error);
    throw new AIServiceError(
      error.message || "Groq API request failed",
      502
    );
  }
}