import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';

interface Cadastro {
    login: string;
    senha: string;
    admin: boolean; 
}


// inserindo um login
const inserir = async (req: Request, res: Response, next: NextFunction) => {
    let login: string = req.body.login;
    let senha: string = req.body.senha;
    let admin: boolean = req.body.admin;
    
    // aqui ele vai inserir o cadastro no banco
    //aqui sera inserido o tratamento de exceção  
    return res.status(200).json({
        message: "inserido com sucesso"
    });
};

// getting a single post
const logar = async (req: Request, res: Response, next: NextFunction) => {
    let login: string = req.body.login;
    let senha: string = 

    // aqui ele vai buscar o cadastro no banco
    //aqui sera inserido o tratamento de exceção  
    let result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
    let post: Post = result.data;
    return res.status(200).json({
        message: post
    });
};


export default { inserir, getPost, updatePost, deletePost };