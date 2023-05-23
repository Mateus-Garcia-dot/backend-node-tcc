import pontosLinha, { IPonto } from "../models/ponto";

export class PontosService {

    async buscarPontosPorLinha(linhaId: string) {
        const pontosResults = await pontosLinha.find({'COD': linhaId});
        return pontosResults;
    }
}