// src/routes/entry.routes.ts
import { Router } from "express";
import {
  createEntry,
  listEntries,
  statsEntries
} from "../controllers/entry.controller";

const router = Router();

router.post("/", createEntry);
router.get("/", listEntries);
router.get("/stats", statsEntries);

export default router;
