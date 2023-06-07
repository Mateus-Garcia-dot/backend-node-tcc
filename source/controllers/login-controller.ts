//mudar variaveis para escopo geral do controller a fim de evitar repetição de código.
import { Request, Response, NextFunction } from 'express';
import { LoginService } from '../services/login-service';


const logar = async (req: Request, res: Response, next: NextFunction) => {
    let login: string = req.body.login;
    let senha: string = req.body.senha;

    if (!login || !senha) {
        return res.status(400).json({ erro: "Favor informar todos os campos" });
    }

    var usuario = await new LoginService().logar(login, senha);

    if(!usuario) {
        return res.status(401).json({ erro: "Nenhum usuário foi encontrado" });
    }

    return res.status(200).json({
        usuario
    });
};


export default { logar };