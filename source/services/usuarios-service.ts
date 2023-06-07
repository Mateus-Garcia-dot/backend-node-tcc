import LoginModel, { ILogin } from "../models/login";
import UsuarioModel, { IUsuario } from "../models/usuario";
import bcrypt from 'bcryptjs';


const listarUsuarios = async () => {

    return await UsuarioModel.find();
}

const cadastrarUsuarios = async (usuario: any) => {
    return await UsuarioModel.create(usuario);
}

const cadastrarLogin = async (login: any) => {
    // const senhaCriptografada = await bcrypt.hash(login.senha, 10);

    // login.senha = senhaCriptografada;

    return await LoginModel.create(login);
}

const verificaExisteUsuarioEmail = async (email: string) => {
    const usuario = await UsuarioModel.findOne({ email: email });

    return usuario != null;
}

export default { listarUsuarios, cadastrarUsuarios, cadastrarLogin, verificaExisteUsuarioEmail };