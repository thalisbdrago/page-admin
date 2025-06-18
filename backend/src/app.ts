import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import adminRoutes from "./routes/admin.routes";
import entryRoutes from "./routes/entry.routes";  // <-- Nova importação

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rotas de login de admin
app.use("/api/admin", adminRoutes);

// Rotas de CRUD de cadastros
app.use("/api/entries", entryRoutes);

// (Opcional) fallback para endpoints não existentes
app.use((_, res) => {
  res.status(404).json({ error: "Endpoint não encontrado" });
});

// Conexão com MongoDB
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log("🟢 MongoDB conectado"))
  .catch((err) => console.error("🔴 Erro ao conectar MongoDB:", err));

export default app;
