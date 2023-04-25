export class Trecho {

    constructor(horario: Date, diaDaSemana: string) {
        this.horario = horario;
        this.diaDaSemana = diaDaSemana;
    }

    horario: Date;
    diaDaSemana: string;
}