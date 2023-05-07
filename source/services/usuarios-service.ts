import usuarios from "../models/usuario";

export class UsuariosService {

    async listarUsuarios() {
        return await usuarios.find();
    }


}