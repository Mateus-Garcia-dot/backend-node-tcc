import axios from "axios";


    const buscarLocalizacaoVeiculoPorLinha = async (linhaId: string) => {
        const result = await axios({ method: "get", url: `https://transporteservico.urbs.curitiba.pr.gov.br/getVeiculos.php?linha=${linhaId}&c=d2fde` })

        return result.data;
    }

    const atualizarLocalizacaoVeiculos = async () => {
        const todosVeiculos = await axios({ method: "get", url: `https://transporteservico.urbs.curitiba.pr.gov.br/getVeiculos.php?c=d2fde` })
       
        //fazer aqui a logica pra pegar todos e salvar no redis
       
        console.log(todosVeiculos);
    }

    export default { buscarLocalizacaoVeiculoPorLinha, atualizarLocalizacaoVeiculos }