import { ObjectId } from "mongodb";
import mongoose from "mongoose";

export interface ILinhaFavorita extends Document {
    _id: ObjectId,
    linhaId: ObjectId,
    usuarioId: ObjectId,
}

const linhasFavoritasSchema = new mongoose.Schema(
    {
        _id: { type: ObjectId, auto: true},
        linhaId:  { type: ObjectId, auto: true},
        usuarioId:  { type: ObjectId, auto: true},
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'usuario'
        },
        linha: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'linha'
        },
    }
);

const LinhasFavoritasModel = mongoose.model('linhasFavoritas', linhasFavoritasSchema);

export default LinhasFavoritasModel;