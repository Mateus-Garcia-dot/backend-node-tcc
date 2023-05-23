import mongoose from "mongoose";

export interface ILinha extends Document {
    _id: string,
    COD: string,
    NOME: number,
    SOMENTE_CARTAO: string,
    NOME_COR: string
  }

  const linhaSchema = new mongoose.Schema(
    {
      _id: {type: String},
      COD: {type: String},
      NOME: {type: Number},
      SOMENTE_CARTAO: {type: String},
      NOME_COR: {type: String},
    }
  );
  
  const linhas = mongoose.model('linhas', linhaSchema);
  
  export default linhas;