import { ObjectId } from "mongodb";
import mongoose from "mongoose";

export interface IUsuario extends Document {
  _id: ObjectId,
  cpf: string,
  telefone: string,
  email: string,
  login: string,
}

const usuarioSchema = new mongoose.Schema(
  {
    _id: {type: ObjectId, auto: true },
    cpf: {type: String},
    telefone: {type: String},
    email: {type: String},
    login: {
      type: mongoose.Schema.Types.ObjectId,   
      ref: 'login'  
    },
  }
);

const UsuarioModel = mongoose.model('usuarios', usuarioSchema);

export default UsuarioModel;