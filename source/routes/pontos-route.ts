import express from "express";
import PontosController from "../controllers/ponto-controller";

const router = express.Router();

router.get("/pontos/linha/:id", PontosController.buscarPontosPorLinha);


  export default router;   