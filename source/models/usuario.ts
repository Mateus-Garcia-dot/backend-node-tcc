export class Usuario {
    
    constructor(nome: string, isAdmin: boolean = false) {
        this.nome = nome;
        this.isAdmin = isAdmin;
    }

    nome: string;
    isAdmin: boolean;
}