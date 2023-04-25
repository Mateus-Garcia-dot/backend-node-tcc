import axios from "axios";

export class VeiculosService {

   async buscarLocalizacaoVeiculoPorLinha(linhaId: number) {
        return axios({ method: "get", url: `https://transporteservico.urbs.curitiba.pr.gov.br/getVeiculos.php?linha=${linhaId}&c=d2fde` })
    }
}