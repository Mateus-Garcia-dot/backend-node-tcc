import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';

interface Cadastro {
    id : number,
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
    let senha: string = req.body.senha;

    // aqui ele vai buscar o cadastro no banco
    //aqui sera inserido o tratamento de exceção  
   
    return res.status(200).json({
        message: post
    });
};

const excluir = async (req: Request, res: Response, next: NextFunction) => {
    // get the post id from req.params
    let id: string = req.params.id;
    // delete the post
    let response: AxiosResponse = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    // return response
    return res.status(200).json({
        message: 'post deleted successfully'
    });
};



export default { inserir, getPost, updatePost, deletePost };