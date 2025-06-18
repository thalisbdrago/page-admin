// src/controllers/admin.controller.ts
import { Request, Response } from "express";
import Admin from "../models/admin.model";

export const loginAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
     console.log("REQ BODY:", req.body);
    const admin = await Admin.findOne({ email });

    if (!admin || admin.password !== password) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }
    console.log("Admin encontrado:", admin);
    console.log("Admin encontrado:", req.body.email);
    return res.status(200).json({ message: "Login bem-sucedido", email: admin.email });
    
  } catch (error) {
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};
