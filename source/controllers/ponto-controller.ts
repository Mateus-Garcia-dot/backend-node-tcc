import axios, { AxiosResponse } from "axios";
import express from "express";
import { Ponto } from "../models/ponto";
import { PontosService } from "../services/ponto-service";


export default class PontoController {

    static buscarPontosPorLocalizacao = async (req: express.Request, res: express.Response) => {
        let result: AxiosResponse = await axios.get('');
        let pontos: [Ponto] = result.data;
        return res.status(200).json({
        });
    };


    static buscarPontosPorLinha = async (req: express.Request, res: express.Response) => {
        const linhaId: string = req.params.linhaId;
        console.log(req.query)
        const pagina: number = Number(req.query.pagina);
        const qtdPorPagina: number = Number(req.query.qtdPorPagina);
        const result = await new PontosService().buscarPontosPorLinha(linhaId, pagina, qtdPorPagina);
        return res.status(200).json(result);
    };
}