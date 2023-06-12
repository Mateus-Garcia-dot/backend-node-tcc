import axios from "axios";
import { RedisClient } from "../configs/redis";
import { Veiculo } from "../models/veiculo";

const buscarLocalizacaoVeiculoPorLinha = async (linhaId: string) => {
    const redisClient = RedisClient.getInstance();
    let onibusLinha = await redisClient.get(linhaId);

    if (!onibusLinha) {
        await atualizarLocalizacaoVeiculos();
        return await redisClient.get(linhaId);
    }

    return onibusLinha;
}

const atualizarLocalizacaoVeiculos = async () => {
    const todosVeiculos = await axios({ method: "get", url: `https://transporteservico.urbs.curitiba.pr.gov.br/getVeiculos.php?c=d2fde` })

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
                todosVeiculos.data[key].REFRESH,
            );
        });

    await salvaVeiculosRedis(veiculos);
}

async function salvaVeiculosRedis(veiculos: Veiculo[]) {
    const redisClient = RedisClient.getInstance();

    const ultimaAtualizacaoUrbs = converteStringParaHora(veiculos[0].horaAtualizacao);

    const onibusCacheado = await redisClient.get(veiculos[0].linha);

    if (onibusCacheado) {
        const onibus = JSON.parse(onibusCacheado);
        const horarioAtualizacaoCacheado = converteStringParaHora(onibus[0].horaAtualizacao);

        if (horarioAtualizacaoCacheado.getHours() < ultimaAtualizacaoUrbs.getHours() ||
            (horarioAtualizacaoCacheado.getHours() === ultimaAtualizacaoUrbs.getHours() && horarioAtualizacaoCacheado.getMinutes() < ultimaAtualizacaoUrbs.getMinutes())) {
            atualizaVeiculos(veiculos, redisClient);
        } 
    } else {
        atualizaVeiculos(veiculos, redisClient);
    }
}

function atualizaVeiculos(veiculos: Veiculo[], redisClient: RedisClient) {
    console.log('Atualizou posição dos onibus')
    veiculos.forEach(async (veiculo: Veiculo) => {
        const onibusLinha = await redisClient.get(veiculo.linha);

        if (onibusLinha && onibusLinha.length > 0) {
            const onibus = JSON.parse(onibusLinha);
            onibus.push(veiculo);
            await redisClient.set(`${veiculo.linha}`, JSON.stringify(onibus));
        } else {
            const onibus = [veiculo];
            await redisClient.set(`${veiculo.linha}`, JSON.stringify(onibus));
        }
    });
}

function converteStringParaHora(horarioString: string) {
    const horasMinutos = horarioString.split(':');
    const horarioUltimaAtualizacaoVeiculos = new Date();
    horarioUltimaAtualizacaoVeiculos.setHours(Number(horasMinutos[0]));
    horarioUltimaAtualizacaoVeiculos.setMinutes(Number(horasMinutos[1]));


    return horarioUltimaAtualizacaoVeiculos;
}

export default { buscarLocalizacaoVeiculoPorLinha, atualizarLocalizacaoVeiculos }

