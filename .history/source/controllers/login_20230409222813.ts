//mudar variaveis para escopo geral do controller a fim de evitar repetição de código.
import { Request, Response, NextFunction } from 'express';

interface Cadastro {
    id : number,
    login: string;
    senha: string;
    admin: boolean; 
}
const arquivoJson = "login_temporario.json";
const fs = require('fs');
const cadastros : Array<Cadastro> = JSON.parse(fs.readFileSync(arquivoJson) ? fs.readFileSync(arquivoJson).toString() : []);

// inserindo um login
const inserir = async (req: Request, res: Response, next: NextFunction) => {
    let id: number = req.body.id;
    let login: string = req.body.login;
    let senha: string = req.body.senha;
    let admin: boolean = req.body.admin;
    
    let cadastro : Cadastro = {
        id : id,
        login : login,
        senha : senha,
        admin : admin
    }

    cadastros.push(cadastro);

    fs.writeFileSync(arquivoJson, JSON.stringify(cadastros));

    return res.status(200).json({
        message: "inserido com sucesso",
        cadastros : [cadastros]
    });
};

// getting a single post
const logar = async (req: Request, res: Response, next: NextFunction) => {
    let login: string = req.body.login;
    let senha: string = req.body.senha;
    let id : number = 0;
    let mensagem : String = "";
    
    cadastros.forEach(elemento => {
        if(login === elemento.login && senha === elemento.senha){
            mensagem = "Usuário logado com sucesso" ;
            id = elemento.id;
        }else{
            mensagem = "Usuário não existe";
        }
    })

    return res.status(200).json({
        message: mensagem,
        idUsuario : id

    });
};

const excluir = async (req: Request, res: Response, next: NextFunction) => {
    let id: string = req.body.id;
    let mensagem : String = "";
    let aux : number = 0;
    
    // mudar para forEach que o indice;
    cadastros.forEach(elemento => {
        if(parseInt(id) === elemento.id){
            mensagem = "Usuário excluído com sucesso" ;
        }else{
            mensagem = "Usuário não existe";
        }
        aux = aux === 0 ? 0 : aux++;
    })

    cadastros.splice(aux, 1);

    fs.writeFileSync(arquivoJson, JSON.stringify(cadastros));

    return res.status(200).json({
        message: mensagem,
        cadastros : [cadastros]
    });
};

const atualizar = async (req: Request, res: Response, next: NextFunction) => {
    let id: string = req.body.id;
    let login: string = req.body.login;
    let senha: string = req.body.senha;

    return res.status(200).json({
        message: "atualizado com sucesso"
    });
};





export default { inserir, logar, atualizar, excluir };