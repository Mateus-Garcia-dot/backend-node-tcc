import express from "express";
import { ILinha } from "../models/linha";
import { LinhasService } from '../services/linha-service';


const buscarLinhas = async (req: express.Request, res: express.Response) => {
    const pagina = parseInt(req.query.pagina as string);
    const qntdPorPagina = parseInt(req.query.qntdPorPagina as string);
    const result = await new LinhasService().buscarLinhas(pagina, qntdPorPagina);
    let linhas: ILinha[] = result;
    return res.status(200).json(linhas);
};

const buscarLinhaPorCod = async (req: express.Request, res: express.Response) => {
    const linhaId: string = req.params.linhaId;
    const result = await new LinhasService().buscarLinhaPorCod(linhaId);
    let linha: ILinha | null = result;
    return res.status(200).json(linha);
};

const buscarShapes = async (req: express.Request, res: express.Response) => {
    const linhaId: string = req.params.linhaId;
    let coordenadas = await new LinhasService().buscarShape(linhaId);

    return res.status(200).json(coordenadas);
};

const buscarTabela = async (req: express.Request, res: express.Response) => {
    const linhaId: string = req.params.linhaId;
    let tabelaLinha = await new LinhasService().buscarTabelaHoraria(linhaId);

    return res.status(200).json(tabelaLinha);
};


export default { buscarLinhas, buscarLinhaPorCod, buscarShapes, buscarTabela };

