import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";


import uploadRoutes from "./routes/upload.routes";
import chatRoutes from "./routes/chat.routes";



const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/upload", uploadRoutes);
app.use("/api/chat", chatRoutes);

app.get("/", (_req, res) => {
  res.send("🌿 PlantPal AI Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});