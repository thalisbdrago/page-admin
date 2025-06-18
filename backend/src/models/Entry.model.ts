// backend/src/models/Entry.model.ts
import { Schema, model, Document } from "mongoose";

export interface IEntry extends Document {
  nome: string;
  data: Date;
  acao: string;
  descricao: string;
  status: "Pendente" | "Em Andamento" | "Concluído";
  observacoes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const EntrySchema = new Schema<IEntry>(
  {
    nome: {
      type: String,
      required: true
    },
    data: {
      type: Date,
      required: true
    },
    acao: {
      type: String,
      required: true
    },
    descricao: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["Pendente", "Em Andamento", "Concluído"],
      default: "Pendente"
    },
    observacoes: String
  },
  {
    timestamps: true
  }
);

// força a coleção a “cadastro”
export default model<IEntry>("Entry", EntrySchema, "cadastro");
