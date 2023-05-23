import express from "express";
import LinhasController from "../controllers/linha-controller";

const router = express.Router();

router.get("/linhas/shape/:linhaId", LinhasController.buscarShapes)

router.get("/linhas", LinhasController.buscarLinhas)

router.get("/linhas/tabela/:linhaId", LinhasController.buscarTabela)

export default router;   