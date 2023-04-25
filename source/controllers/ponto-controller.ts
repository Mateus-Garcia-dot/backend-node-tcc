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


    static buscarPontoPorFitros = async (req: express.Request, res: express.Response) => {
        const linhaId: number = Number(req.params.linhaId);
        const result = await new PontosService().buscarPontosPorLinha(linhaId);
        let pontos: [Ponto] = result.data;
        return res.status(200).json(pontos);
    };
}