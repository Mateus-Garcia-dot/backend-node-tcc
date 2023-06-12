import axios, { AxiosResponse } from "axios";
import express from 'express';
import { Veiculo } from "../models/veiculo";
import  VeiculosService  from "../services/veiculo-service";


export class VeiculoController {

    static buscarVeiculo = async (req: express.Request, res: express.Response) => {
        let result: AxiosResponse = await axios.get('');
        let veiculos: [Veiculo] = result.data;
        return res.status(200).json({
        });
    };

    static buscarLocalizacaoVeiculoPorLinha = async (req: express.Request, res: express.Response) => {
        const linhaId: string = req.params.linhaId;
        let veiculos = await VeiculosService.buscarLocalizacaoVeiculoPorLinha(linhaId);
     
        return res.status(200).json(veiculos);
    };

}

