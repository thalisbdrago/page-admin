// src/controllers/entry.controller.ts
import { Request, Response } from "express";
import Entry from "../models/Entry.model";

// POST /api/entries
export async function createEntry(req: Request, res: Response) {
  console.log("Received request to create entry:", req.body);
  try {
    const doc = await Entry.create(req.body);
    console.log("Entry created successfully:", doc);
    return res.status(201).json(doc);
  } catch (err: any) {
    console.error("Error creating entry:", err);
    return res.status(400).json({ error: "Falha ao criar entry", details: err.message });
  }
}

// GET /api/entries
export async function listEntries(_req: Request, res: Response) {
  try {
    const list = await Entry.find().sort({ createdAt: -1 });
    return res.json(list);
  } catch (err: any) {
    return res.status(500).json({ error: "Falha ao listar entries", details: err.message });
  }
}

// GET /api/entries/stats
export async function statsEntries(_req: Request, res: Response) {
  try {
    const stats = await Entry.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);
    return res.json(stats);
  } catch (err: any) {
    return res.status(500).json({ error: "Falha ao agregar stats", details: err.message });
  }
}
