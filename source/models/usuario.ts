import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema(
  {
    _id: {type: String},
    email: {type: String},
  }
);

const usuarios = mongoose.model('usuarios', usuarioSchema);

export default usuarios;