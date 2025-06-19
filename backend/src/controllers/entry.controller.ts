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
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%d/%m", date: "$createdAt" } },
            status: "$status"
          },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: "$_id.date",
          statuses: {
            $push: {
              status: "$_id.status",
              count: "$count"
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          Pendente: {
            $let: {
              vars: {
                match: {
                  $arrayElemAt: [
                    {
                      $filter: {
                        input: "$statuses",
                        cond: { $eq: ["$$this.status", "Pendente"] }
                      }
                    },
                    0
                  ]
                }
              },
              in: { $ifNull: ["$$match.count", 0] }
            }
          },
          "Em Andamento": {
            $let: {
              vars: {
                match: {
                  $arrayElemAt: [
                    {
                      $filter: {
                        input: "$statuses",
                        cond: { $eq: ["$$this.status", "Em Andamento"] }
                      }
                    },
                    0
                  ]
                }
              },
              in: { $ifNull: ["$$match.count", 0] }
            }
          },
          Concluído: {
            $let: {
              vars: {
                match: {
                  $arrayElemAt: [
                    {
                      $filter: {
                        input: "$statuses",
                        cond: { $eq: ["$$this.status", "Concluído"] }
                      }
                    },
                    0
                  ]
                }
              },
              in: { $ifNull: ["$$match.count", 0] }
            }
          }
        }
      },
      { $sort: { name: 1 } }
    ]);

    return res.status(200).json(stats);
  } catch (err: any) {
    console.error("Falha ao agregar stats:", err);
    return res.status(500).json({ error: "Falha ao agregar stats", details: err.message });
  }
}

// PUT /api/entries/:id
export async function updateEntry(req: Request, res: Response) {
  try {
    const updated = await Entry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ error: "Entry não encontrada." });
    }
    return res.json(updated);
  } catch (err: any) {
    console.error("Falha ao atualizar entry:", err);
    return res.status(500).json({ error: "Falha ao atualizar entry", details: err.message });
  }
}

// DELETE /api/entries/:id
export async function deleteEntry(req: Request, res: Response) {
  try {
    const deleted = await Entry.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Entry não encontrada." });
    }
    return res.json({ message: "Entry removida com sucesso." });
  } catch (err: any) {
    console.error("Falha ao deletar entry:", err);
    return res.status(500).json({ error: "Falha ao deletar entry", details: err.message });
  }
}
