import ShapeModel, { IShape } from "../models/shape";
import LinhaModel, { ILinha } from "../models/linha";
import TabelaLinhaModel, { ITabelaLinha } from "../models/tabela-linha";

export class LinhasService {

    async buscarLinhaPorCod(linhaId: string) {
        const linhasResult = await LinhaModel.findOne<ILinha>({'COD': linhaId});
        return linhasResult;
    }    

    async buscarLinhas(pagina: number = 0, qntdPorPagina: number = 10) {
        const linhasResult = await LinhaModel.find<ILinha>().skip(pagina).limit(qntdPorPagina);
        return linhasResult;
    }

    async buscarShape(linhaId: string) {
        const shape = await ShapeModel.findOne<IShape>({ 'COD': linhaId });
        const coordenadas = shape?.coordinate.coordinates.map(coordenada => { return { lng: coordenada[0], lat: coordenada[1] } })
        return coordenadas;
    }

    async buscarTabelaHoraria(linhaId: string) {
        const tabelaResult = await TabelaLinhaModel
        .aggregate([
            {
              $match: {
                COD: linhaId 
              }
            },
            {
                $group: {
                    _id: "$NUM", 
                    horariosPonto: { $push: "$$ROOT" }
                }
              },
            {
              $sort: {
                NUM: 1 
              }
            }
          ])
            
        return tabelaResult;
    }

}
