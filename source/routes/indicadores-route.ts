import express from "express";
import IndicadoresController from "../controllers/indicadores-controller";

const router = express.Router();

router.get("/indicadores/linhas-movimentadas", IndicadoresController.listarLinhasMaisMovimentadas)

export default router;   