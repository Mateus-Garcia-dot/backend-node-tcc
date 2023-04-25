import axios from "axios";

export class PontosService {

    async buscarPontosPorLinha(linhaId: string, pagina: number = 1, qtdPorPagina: number = 10) {
        const result = await axios({ method: "get", url: `https://transporteservico.urbs.curitiba.pr.gov.br/getPontosLinha.php?linha=${linhaId}&c=d2fde` });

        console.log(pagina)
        console.log(qtdPorPagina)
        console.log(pagina * qtdPorPagina, (pagina - 1) * qtdPorPagina)
        return {
            data: result.data.slice((pagina - 1) * qtdPorPagina, pagina * qtdPorPagina),
            total: result.data.length,
            totalPaginas: result.data.length / qtdPorPagina,
        }
    }
}