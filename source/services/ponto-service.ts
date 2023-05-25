import pontosLinha, { IPonto } from "../models/ponto";

export class PontosService {

    async buscarPontosPorLinha(linhaId: string) {
        const pontosResults = await pontosLinha.find({'COD': linhaId});
        return pontosResults;
    }

    async buscarTodosPontos(pagina: number = 0, qntdPorPagina: number = 10) {
        const linhasResult = await pontosLinha.find().skip(pagina).limit(qntdPorPagina);
        return linhasResult;
    }
}