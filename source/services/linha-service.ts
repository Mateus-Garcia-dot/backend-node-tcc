import axios from "axios";

export class LinhasService {

    async buscarLinhas() {

    }


    async buscarShape(linhaId: number) {
        return axios({ method: "get", url: "https://transporteservico.urbs.curitiba.pr.gov.br/getShapeLinha.php?linha=022&c=98ad8" })
    }
}