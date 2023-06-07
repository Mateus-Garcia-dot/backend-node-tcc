import { ObjectId } from "mongodb";
import mongoose from "mongoose";

export interface ILogin extends Document {
  _id?: ObjectId,
  login: string,
  senha: string,
  admin?: boolean,
}

const loginSchema = new mongoose.Schema(
  {
    _id: {type: ObjectId, auto: true},
    login: {type: String},
    senha: {type: String},
    admin: {type: Boolean},
  }
);

const LoginModel = mongoose.model('login', loginSchema);

export default LoginModel;