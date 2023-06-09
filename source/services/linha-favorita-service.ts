import LinhasFavoritasModel from "../models/linha-favorita";

const favoritarLinha = async (linhaId: string, usuarioId: string) => {
    return await LinhasFavoritasModel.create({ linhaId: linhaId, usuarioId: usuarioId });
}

const desfavoritarLinha = async (linhaId: string, usuarioId: string) => {
    return await LinhasFavoritasModel.deleteOne({ linhaId: linhaId, usuarioId: usuarioId });
}

const buscarLinhasFavoritas = async (usuarioId: string) => {
    return await LinhasFavoritasModel.find({ usuarioId: usuarioId });
}

const buscarLinhaFavorita = async (linhaId: string, usuarioId: string) => {
    return await LinhasFavoritasModel.findOne({linhaId: linhaId, usuarioId: usuarioId });
}

export default { favoritarLinha, desfavoritarLinha, buscarLinhasFavoritas, buscarLinhaFavorita };