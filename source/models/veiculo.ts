export class Veiculo {

    codigo: string;
    tipo: string;
    situacao: string;
    adaptado: string;
    latitude: number;
    longitude: number;
    linha: string;
    horaAtualizacao: string;

    constructor(codigo: string, tipo: string, situacao: string, adaptado: string, latitude: number, longitude: number, linha: string, horaAtualizacao: string) {
        this.codigo = codigo;
        this.tipo = tipo;
        this.situacao = situacao;
        this.adaptado = adaptado;
        this.latitude = latitude;
        this.longitude = longitude;
        this.linha = linha;
        this.horaAtualizacao = horaAtualizacao;
    }
}