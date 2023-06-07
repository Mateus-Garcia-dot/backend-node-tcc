import mongoose from "mongoose";

export interface IPonto extends Document {
    _id: string,
    NOME: string,
    NUM: string,
    LAT: string,
    LON: string,
    SEQ: string,
    SENTIDO: string,
    TIPO: string,
    ITINERARY_ID: string,
    COD: string,
    GRUPO: string

}

const pontoSchema = new mongoose.Schema(
    {
        _id: { type: String },
        COD: { type: String },
        NOME: { type: String },
        LAT: { type: String },
        LON: { type: String },
        SEQ: { type: String },
        SENTIDO: { type: String },
        TIPO: { type: String },
        ITINERARY_ID: { type: String },
        GRUPO: { type: String },
    }, { collection: 'pontosLinha' }
);

const PontosLinhaModel = mongoose.model('pontosLinha', pontoSchema);

export default PontosLinhaModel;