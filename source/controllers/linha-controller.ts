import express from "express";
import getClient from "../configs/elasticsearch";
import { Linha } from "../models/linha";
import { Shape } from "../models/shape";
import { LinhasService } from '../services/linha-service';
import { UsuariosService } from "../services/usuarios-service";


export default class LinhasController {

    static buscarLinhas = async (req: express.Request, res: express.Response) => {
        // console.log(await new UsuariosService().listarUsuarios());

        const result = await new LinhasService().buscarLinhas();
        let linhas: Linha[] = result.data;
        return res.status(200).json({ linhas });
    };

    static buscarShapes = async (req: express.Request, res: express.Response) => {

        // const data = await getClient().search({
        //     index: 'shapes',
        //     size: 10
        // });
        // console.log(data.hits);


        const linhaId: string = req.params.linhaId;
        const result = await new LinhasService().buscarShape(linhaId);
        let shapes: Shape[] = result.data;
        shapes = shapes.map((pontoShape: any) => {
            return new Shape(pontoShape.SENTIDO, parseFloat(pontoShape.LAT?.replace(',', '.')), parseFloat(pontoShape.LON?.replace(',', '.')));
        });

        return res.status(200).json(data.hits);
    };

}

