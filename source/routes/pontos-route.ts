import express from "express";
import PontosController from "../controllers/ponto-controller";

const router = express.Router();

router.get("/pontos/linha/:linhaId", PontosController.buscarPontosPorLinha);


  export default router;   