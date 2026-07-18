import { Router } from "express";
import { chatWithPlantPal } from "../controllers/chat.controller";

const router = Router();

router.post("/", chatWithPlantPal);

export default router;
