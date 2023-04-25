import axios from "axios";

export class PontosService {

    async buscarPontosPorLinha(linhaId: number) {
        return axios({ method: "get", url: "https://transporteservico.urbs.curitiba.pr.gov.br/getPontosLinha.php?linha=666&c=d2fde" })
    }
}