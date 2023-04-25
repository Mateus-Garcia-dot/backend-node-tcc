import axios, { AxiosResponse } from "axios";
import express from 'express';
import { Veiculo } from "../models/veiculo";
import { VeiculosService } from "../services/veiculo-service";


export class VeiculoController {

    static buscarVeiculo = async (req: express.Request, res: express.Response) => {
        let result: AxiosResponse = await axios.get('');
        let posts: [Veiculo] = result.data;
        return res.status(200).json({
        });
    };

    static buscarLocalizacaoAtual = async (req: express.Request, res: express.Response) => {
        const linhaId: number = Number(req.params.linhaId);
        const result = await new VeiculosService().buscarLocalizacaoAtual(linhaId);
        console.log(result.data)
        let veiculos = result.data;
        veiculos = Object.keys(veiculos).map((key: string) => {
            return new Veiculo(
                veiculos[key].COD,
                veiculos[key].TIPO_VEIC,
                veiculos[key].SITUACAO,
                veiculos[key].ADAPT,
                veiculos[key].LAT,
                veiculos[key].LON
            );
        });

        return res.status(200).json(veiculos);
    };

}

