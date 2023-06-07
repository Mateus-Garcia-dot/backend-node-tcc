import mongoose from "mongoose";

export interface ITabelaLinha extends Document {
    _id: string,
    HORA: string,
    PONTO: string,
    DIA: string,
    TABELA: string
    ADAPT: string
    COD: string
}

const tabelaLinhaSchema = new mongoose.Schema(
    {
        _id: { type: String },
        HORA: { type: String },
        PONTO: { type: String },
        DIA: { type: String },
        TABELA: { type: String },
        ADAPT: { type: String },
        COD: { type: String },
    },
    { collection: 'tabelaLinha' });

const TabelaLinhaModel = mongoose.model('tabelaLinha', tabelaLinhaSchema);

export default TabelaLinhaModel;