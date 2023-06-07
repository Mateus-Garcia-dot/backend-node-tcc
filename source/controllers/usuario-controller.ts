import { Request, Response, NextFunction } from 'express';
import UsuarioService  from "../services/usuarios-service";

const cadastrar = async (req: Request, res: Response, next: NextFunction) => {

    const conta = { login: req.body.login, senha: req.body.senha };

    var contaExiste = await UsuarioService.verificaExisteUsuarioEmail(req.body.email);

    if(contaExiste) {
        return res.status(409).json({ erro: "Já existe uma conta cadastrada com esse e-mail" });
    }

    var contaCadastrada = await UsuarioService.cadastrarLogin(conta);

    var usuarioCadastrado = await UsuarioService.cadastrarUsuarios({
        cpf: req.body.cpf,
        telefone: req.body.telefone,
        email: req.body.email,
        login: contaCadastrada._id,
        nome: req.body.nome
    });

    if (!usuarioCadastrado) {
        return res.status(401).json({ erro: "Nenhum usuário foi encontrado" });
    }

    return res.status(201).json({
        usuarioCadastrado
    });
};


export default { cadastrar };