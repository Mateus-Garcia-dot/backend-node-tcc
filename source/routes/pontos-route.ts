import express from "express";
import PontosController from "../controllers/ponto-controller";

const router = express.Router();

router.get("/pontos/linha/:linhaId", PontosController.buscarPontosPorLinha);

router.get("/pontos", PontosController.buscarTodosPontos);

  export default router;   