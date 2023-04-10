import { Request, Response, NextFunction } from 'express';

interface Cadastro {
    id : number,
    login: string;
    senha: string;
    admin: boolean; 
}
const arquivoJson = "login_temporario.json";
const fs = require('fs');
const cadastros = JSON.parse(fs.readFileSync(arquivoJson) ? fs.readFileSync(arquivoJson).toString() : []);

// inserindo um login
const inserir = async (req: Request, res: Response, next: NextFunction) => {
    let id: number = req.body.id;
    let login: string = req.body.login;
    let senha: string = req.body.senha;
    let admin: boolean = req.body.admin;
    
    let cadastro = {
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
    let existeUsuario : boolean = false;
    let mensagem : String = "";
    
    cadastros.forEach(loginJson => {
        if(login === loginJson.login && senha === loginJson.senha){
            existeUsuario = true;
        }else{
            existeUsuario = false;
        }
    })

    return res.status(200).json({
        message: existeUsuario ? "logado com sucesso" : "usuário não identificado"
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

const excluir = async (req: Request, res: Response, next: NextFunction) => {
    let id: string = req.body.id;
    
    return res.status(200).json({
        message: "excluido com sucesso"
    });
};



export default { inserir, logar, atualizar, excluir };