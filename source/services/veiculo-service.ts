import axios from "axios";
import redisClient from "../configs/redis";
import linhas, { ILinha } from "../models/linha";
var cron = require('node-cron');

export class VeiculosService {

    async buscarLocalizacaoVeiculoPorLinha(linhaId: string) {
        const result = await axios({ method: "get", url: `https://transporteservico.urbs.curitiba.pr.gov.br/getVeiculos.php?linha=${linhaId}&c=d2fde` })

        return result.data;
    }
}