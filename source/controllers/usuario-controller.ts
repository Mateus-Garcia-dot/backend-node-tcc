import { Request, Response, NextFunction } from 'express';
import UsuarioService  from "../services/usuarios-service";
import linhasFavoritasServices from '../services/linha-favorita-service'

const cadastrar = async (req: Request, res: Response, next: NextFunction) => {
    const conta = { login: req.body.login, senha: req.body.senha };

    var contaExiste = await UsuarioService.verificaExisteUsuarioEmail(req.body.email);

    if(contaExiste) {
        return res.status(409).json({ erro: "Já existe uma conta cadastrada com esse e-mail" });
    }

    var contaCadastrada = await UsuarioService.cadastrarLogin(conta);

    var usuario = await UsuarioService.cadastrarUsuarios({
        cpf: req.body.cpf,
        telefone: req.body.telefone,
        email: req.body.email,
        login: contaCadastrada._id,
        nome: req.body.nome
    });

    if (!usuario) {
        return res.status(401).json({ erro: "Nenhum usuário foi encontrado" });
    }

    return res.status(201).json({
        usuario
    });
};

const buscarLinhasFavoritas = async (req: Request, res: Response) => {
    const usuarioId: string = req.params.usuarioId;

    let tabelaLinha = await linhasFavoritasServices.buscarLinhasFavoritas(usuarioId);

    return res.status(200).json(tabelaLinha);
};

const favoritarLinha = async (req: Request, res: Response) => {
    const linhaId: string = req.body.linhaId;
    const usuarioId: string = req.params.usuarioId;

    const linhaFavoritada  = await linhasFavoritasServices.buscarLinhaFavorita(linhaId, usuarioId);

    if(linhaFavoritada != null)
        return res.status(409).json({ erro: "Essa linha já foi favoritada" });

    let tabelaLinha = await linhasFavoritasServices.favoritarLinha(linhaId, usuarioId);

    return res.status(201).json(tabelaLinha);
};

const desfavoritarLinha = async (req: Request, res: Response) => {
    const linhaId: string = req.body.linhaId;
    const usuarioId: string = req.params.usuarioId;

    let tabelaLinha = await linhasFavoritasServices.desfavoritarLinha(linhaId, usuarioId);

    return res.status(204).json(tabelaLinha);
};


export default { cadastrar, buscarLinhasFavoritas, favoritarLinha, desfavoritarLinha };