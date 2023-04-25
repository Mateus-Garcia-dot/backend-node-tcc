import express from "express";
import { VeiculoController } from "../controllers/veiculo-controller";

const router = express.Router();

router.get("/veiculos/linha/:linhaId", VeiculoController.buscarLocalizacaoVeiculoPorLinha)


  export default router;   