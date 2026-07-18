import { Request, Response } from "express";
import fs from "fs";
import { PDFParse } from "pdf-parse";
import { AIServiceError, analyzePDF } from "../services/ai.service";
import { addKnowledgeEntry, getKnowledgeEntries } from "../services/knowledge.service";

export const uploadPDF = async (
    req: Request,
    res: Response
) => {
    let parser: PDFParse | null = null;
    let filePath: string | null = null;

    try {

        const file = req.file;
        const knowledgeType = String(req.body.knowledgeType || "General Plant Guide");

        if (!file) {

            return res.status(400).json({
                success: false,
                message: "No PDF uploaded"
            });

        }


        filePath = file.path;


        console.log("Uploaded file:", file.path);


        // Read PDF file
        const buffer = fs.readFileSync(file.path);


        // PDF Parser v2.4.5
        parser = new PDFParse({
            data: buffer
        });


        const result = await parser.getText();


        const text = result.text;

        const aiResponse = await analyzePDF(text, knowledgeType);
        const savedKnowledge = addKnowledgeEntry({
            fileName: file.originalname,
            knowledgeType,
            summary: aiResponse
        });


        console.log("Extracted text:");
        console.log(text.substring(0,500));


        return res.json({

    success:true,

    message:"PDF analyzed and added to knowledge base",

    file:file.originalname,

    answer:aiResponse,

    knowledge:savedKnowledge,

    totalKnowledgeItems:getKnowledgeEntries().length

});


    } catch (error: unknown) {


        console.log("PDF ERROR:", error);

        const statusCode =
            error instanceof AIServiceError ? error.statusCode : 500;
        const message =
            error instanceof Error
                ? error.message
                : "PDF processing failed";


        return res.status(statusCode).json({

            success:false,

            message

        });

    } finally {
        if (parser) {
            await parser.destroy();
        }

        if (filePath && fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }

};

export const listKnowledge = (_req: Request, res: Response) => {
    return res.json({
        success: true,
        items: getKnowledgeEntries()
    });
};