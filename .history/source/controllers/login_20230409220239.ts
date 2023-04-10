import { Request, Response, NextFunction } from 'express';

interface Cadastro {
    id : number,
    login: string;
    senha: string;
    admin: boolean; 
}

const fs = require('fs');
const cadastros = JSON.parse(fs.readFileSync('login_temporario.json').toString()) ? JSON.parse(fs.readFileSyncquire('./login_temporario.json')) : "null";

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

    fs.writeFile('./login_temporario.json', JSON.stringify(cadastros));

    return res.status(200).json({
        message: "inserido com sucesso"
    });
};

// getting a single post
const logar = async (req: Request, res: Response, next: NextFunction) => {
    let login: string = req.body.login;
    let senha: string = req.body.senha;

    // aqui ele vai buscar o cadastro no banco
    //aqui sera inserido o tratamento de exceção  
   
    return res.status(200).json({
        message: "logado com sucesso"
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