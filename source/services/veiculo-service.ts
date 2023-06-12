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
    const veiculos: any = await buscarLocalizacaoVeiculosUrbs();
    await salvarLocalizacaoVeiculosRedis(veiculos);
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

async function salvarLocalizacaoVeiculosRedis(veiculosUrbs: Veiculo[]) {
    const redisClient = RedisClient.getInstance();

    const ultimaAtualizacaoUrbs = converteStringParaHora(veiculosUrbs[0].horaAtualizacao);

    veiculosUrbs.forEach(async (veiculo: Veiculo) => {
        const veiculoCacheado = await redisClient.get(veiculo.linha);

        if (veiculoCacheado) {
            let veiculos = JSON.parse(veiculoCacheado);

            if (veiculos.length > 0) {
                const horarioAtualizacaoCacheado = converteStringParaHora(veiculos[0].horaAtualizacao);

                if (horarioAtualizacaoCacheado.getHours() < ultimaAtualizacaoUrbs.getHours() ||
                    (horarioAtualizacaoCacheado.getHours() === ultimaAtualizacaoUrbs.getHours() && horarioAtualizacaoCacheado.getMinutes() < ultimaAtualizacaoUrbs.getMinutes())) {
                    veiculos = [veiculo];
                } else {
                    veiculos.push(veiculo);
                }
            }

            await redisClient.set(`${veiculo.linha}`, JSON.stringify(veiculos));
        } else {
            await redisClient.set(`${veiculo.linha}`, JSON.stringify([veiculo]));
        }
    });
    console.log('Atualizou posição dos onibus')
}

function converteStringParaHora(horarioString: string) {
    const horasMinutos = horarioString.split(':');
    const horarioUltimaAtualizacaoVeiculos = new Date();
    horarioUltimaAtualizacaoVeiculos.setHours(Number(horasMinutos[0]));
    horarioUltimaAtualizacaoVeiculos.setMinutes(Number(horasMinutos[1]));


    return horarioUltimaAtualizacaoVeiculos;
}

export default { buscarLocalizacaoVeiculoPorLinha, atualizarLocalizacaoVeiculos }

