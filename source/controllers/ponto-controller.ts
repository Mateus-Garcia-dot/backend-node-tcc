import axios, { AxiosResponse } from "axios";
import express from "express";
import { IPonto } from "../models/ponto";
import { PontosService } from "../services/ponto-service";


export default class PontoController {

    static buscarPontosPorLinha = async (req: express.Request, res: express.Response) => {
        const linhaId: string = req.params.linhaId;
        const result = await new PontosService().buscarPontosPorLinha(linhaId);
        return res.status(200).json(result);
    };

    static buscarTodosPontos = async (req: express.Request, res: express.Response) => {
        const pagina = parseInt(req.query.pagina as string);
        const qntdPorPagina = parseInt(req.query.qntdPorPagina as string);
        const result = await new PontosService().buscarTodosPontos(pagina, qntdPorPagina);
        return res.status(200).json(result);
    };
}