import axios from "axios";

export class LinhasService {

    async buscarLinhas() {
        return axios({ method: "get", url: "https://transporteservico.urbs.curitiba.pr.gov.br/getLinhas.php?c=d2fde" })
    }

    async buscarShape(linhaId: number) {
        return axios({ method: "get", url: "https://transporteservico.urbs.curitiba.pr.gov.br/getShapeLinha.php?linha=022&c=98ad8" })
    }
}