import express from "express";
import LinhasController from "../controllers/linha-controller";

const router = express.Router();

router.get("/linhas", LinhasController.buscarLinhas)

router.get("/linhas/:linhaId", LinhasController.buscarLinhaPorCod)

router.get("/linhas/tabela/:linhaId", LinhasController.buscarTabela)

router.get("/linhas/shape/:linhaId", LinhasController.buscarShapes)

export default router;   