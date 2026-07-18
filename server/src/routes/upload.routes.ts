import { Router } from "express";
import upload from "../utils/multer";
import { listKnowledge, uploadPDF } from "../controllers/upload.controller";


const router = Router();


router.post(
    "/",
    upload.single("file"),
    uploadPDF
);

router.get("/knowledge", listKnowledge);


export default router;