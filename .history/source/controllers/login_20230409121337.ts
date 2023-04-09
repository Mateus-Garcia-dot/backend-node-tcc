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
    
    // aqui ele vai inserrir o cadastro no banco
    //aqui sera inserido o tratamento de excessão 
    return res.status(200).json({
        message: "inserido com sucesso"
    });
};

// getting a single post
const getPost = async (req: Request, res: Response, next: NextFunction) => {
    // get the post id from the req
    let id: string = req.params.id;
    // get the post
    let result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
    let post: Post = result.data;
    return res.status(200).json({
        message: post
    });
};

// updating a post
const updatePost = async (req: Request, res: Response, next: NextFunction) => {
    // get the post id from the req.params
    let id: string = req.params.id;
    // get the data from req.body
    let title: string = req.body.title ?? null;
    let body: string = req.body.body ?? null;
    // update the post
    let response: AxiosResponse = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        ...(title && { title }),
        ...(body && { body })
    });
    // return response
    return res.status(200).json({
        message: response.data
    });
};

// deleting a post
const deletePost = async (req: Request, res: Response, next: NextFunction) => {
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