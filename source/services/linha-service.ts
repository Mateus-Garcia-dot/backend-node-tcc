import shapes, { IShape } from "../models/shape";
import linhas, { ILinha } from "../models/linha";
import tabelaLinha, { ITabelaLinha } from "../models/tabela-linha";

export class LinhasService {

    async buscarLinhaPorId(linhaId: string) {
        const linhasResult = await linhas.findOne<ILinha>({'COD': linhaId});
        return linhasResult;
    }    

    async buscarLinhas(pagina: number = 0, qntdPorPagina: number = 10) {
        const linhasResult = await linhas.find<ILinha>().skip(pagina).limit(qntdPorPagina);
        return linhasResult;
    }

    async buscarShape(linhaId: string) {
        const shape = await shapes.findOne<IShape>({ 'COD': linhaId });
        const coordenadas = shape?.coordinate.coordinates.map(coordenada => { return { lng: coordenada[0], lat: coordenada[1] } })
        return coordenadas;
    }

    async buscarTabela(linhaId: string) {
        const tabelaResult = await tabelaLinha.find<ITabelaLinha>({ 'COD': linhaId });
        return tabelaResult;
    }

}
