import axios from "axios";
import { RedisClient } from "../configs/redis";
import { Veiculo } from "../models/veiculo";

const buscarLocalizacaoVeiculoPorLinha = async (linhaId: string) => {
    const redisClient = RedisClient.getInstance();
    let onibusCacheado = await redisClient.get(linhaId);

    if (!onibusCacheado) {
        await atualizarLocalizacaoVeiculos();
        onibusCacheado = await redisClient.get(linhaId);
    }

    return JSON.parse(onibusCacheado);
}

const atualizarLocalizacaoVeiculos = async () => {
    const veiculosUrbs: any = await buscarLocalizacaoVeiculosUrbs();
    await cachearLocalizacaoVeiculosRedis(veiculosUrbs);
}

async function buscarLocalizacaoVeiculosUrbs() {
    const todosVeiculos = await axios({ method: "get", url: `https://transporteservico.urbs.curitiba.pr.gov.br/getVeiculos.php?c=d2fde` });

    const veiculos: any = Object.keys(todosVeiculos.data)
        .map((key: string) => {
            return new Veiculo(
                todosVeiculos.data[key].COD,
                todosVeiculos.data[key].TIPO_VEIC,
                todosVeiculos.data[key].SITUACAO,
                todosVeiculos.data[key].ADAPT,
                todosVeiculos.data[key].LAT,
                todosVeiculos.data[key].LON,
                todosVeiculos.data[key].CODIGOLINHA,
                todosVeiculos.data[key].REFRESH
            );
        });
    return veiculos;
}

async function cachearLocalizacaoVeiculosRedis(veiculosUrbs: Veiculo[]) {
    const redisClient = RedisClient.getInstance();

    const veiculosPorLinha = agrupaLocalizacaoVeiculosPorLinha(veiculosUrbs);

    Object.keys(veiculosPorLinha).forEach(async (linha: string) => {
        await redisClient.set(linha, JSON.stringify(veiculosPorLinha[linha]));
    });
}

function agrupaLocalizacaoVeiculosPorLinha(veiculosUrbs: Veiculo[]) {
    let veiculosPorLinha: any = [];

    veiculosUrbs.forEach(async (veiculo: Veiculo) => {
        if (veiculosPorLinha[veiculo.linha]) {
            veiculosPorLinha[veiculo.linha].push(veiculo);
        } else {
            veiculosPorLinha[veiculo.linha] = [veiculo];
        }
    });

    return veiculosPorLinha;
}


export default { buscarLocalizacaoVeiculoPorLinha, atualizarLocalizacaoVeiculos }

