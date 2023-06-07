import LoginModel, { ILogin } from "../models/login";
import bcrypt from 'bcryptjs';

export class LoginService {

    async cadastrarLogin(login: ILogin) {
        const salt = await bcrypt.genSalt(10);
        const senhaCriptografada = await bcrypt.hash(login.senha, salt);

        login.senha = senhaCriptografada;

        return await LoginModel.create(login);
    }

    async logar(login: string, senha: string) {
        const salt = await bcrypt.genSalt(10);
        const senhaCriptografada = await bcrypt.hash(login, salt);

        senha = senhaCriptografada;

        return await LoginModel.findOne({ login: login, senha: senha });
    }

}