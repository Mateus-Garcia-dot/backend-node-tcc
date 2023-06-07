import LoginModel, { ILogin } from "../models/login";
import bcrypt from 'bcryptjs';

export class LoginService {

    async cadastrarLogin(login: ILogin) {
        // const senhaCriptografada = await bcrypt.hash(login.senha, 10);

        // login.senha = senhaCriptografada;

        return await LoginModel.create(login);
    }

    async logar(login: string, senha: string) {
        // const senhaCriptografada = await bcrypt.hash(login, 10);

        // senha = senhaCriptografada;

        console.log(senha)
        console.log(senha)

        return await LoginModel.findOne({ login: login, senha: senha });
    }

}