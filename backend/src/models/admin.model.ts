// src/models/admin.model.ts
import { Schema, model, Document } from "mongoose";

export interface IAdmin extends Document {
  email: string;
  password: string;
}

const adminSchema = new Schema<IAdmin>({
  email: { type: String, required: true },
  password: { type: String, required: true }
});

// força a coleção para 'adminusers'
export default model<IAdmin>("AdminUser", adminSchema, "admin");
