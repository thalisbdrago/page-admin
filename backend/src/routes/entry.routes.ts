// src/routes/entry.routes.ts
import { Router } from "express";
import Entry from "../models/Entry.model";
import {
  createEntry,
  listEntries,
  statsEntries
} from "../controllers/entry.controller";

const router = Router();

router.post("/", createEntry);
router.get("/", listEntries);
router.get("/stats", statsEntries);

// Atualizar uma entrada
router.put("/:id", async (req, res) => {
  try {
    const updated = await Entry.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: "Entrada não encontrada." });
    }
    res.status(200).json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao atualizar entrada." });
  }
});

// Excluir uma entrada
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Entry.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Entrada não encontrada." });
    }
    res.status(200).json({ message: "Entrada removida com sucesso." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao deletar entrada." });
  }
});

export default router;
