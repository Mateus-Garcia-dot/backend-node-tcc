import express from "express";
import getClient from "../configs/elasticsearch";
import { Linha } from "../models/linha";
import { LinhasService } from '../services/linha-service';


export default class LinhasController {

    static buscarLinhas = async (req: express.Request, res: express.Response) => {
        // console.log(await new UsuariosService().listarUsuarios());

        const result = await new LinhasService().buscarLinhas();
        let linhas: Linha[] = result.data;
        return res.status(200).json({ linhas });
    };

    static buscarShapes = async (req: express.Request, res: express.Response) => {
        const linhaId: string = req.params.linhaId;
        let coordenadas = await new LinhasService().buscarShape(linhaId);

        return res.status(200).json(coordenadas);
    };

}

