import axios from "axios";

export class PontosService {

    async buscarPontosPorLinha(linhaId: string) {
        return axios({ method: "get", url: `https://transporteservico.urbs.curitiba.pr.gov.br/getPontosLinha.php?linha=${linhaId}&c=d2fde` })
    }
}