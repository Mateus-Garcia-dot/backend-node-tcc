import axios from "axios";
import shapes, { IShape } from "../models/shape";

export class LinhasService {

    async buscarLinhas() {
        return axios({ method: "get", url: "https://transporteservico.urbs.curitiba.pr.gov.br/getLinhas.php?c=d2fde" })
    }

    async buscarShape(linhaId: string) {
        const shape = await shapes.findOne<IShape>({'COD': linhaId});
        const coordenadas = shape?.coordinate.coordinates.map(coordenada => { return { lng: coordenada[0], lat: coordenada[1] } })
        return coordenadas;
    }
}
