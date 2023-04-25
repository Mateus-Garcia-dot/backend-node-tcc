import express from "express";
import LinhasController from "../controllers/linha-controller";

const router = express.Router();

router.get("/linhas/shape/:linhaId", LinhasController.buscarShapes)

router.get("/linhas", LinhasController.buscarLinhas)

export default router;   