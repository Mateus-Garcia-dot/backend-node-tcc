import express from "express";
import LinhasController from "../controllers/linha-controller";

const router = express.Router();

router
  .get("/linhas/shape/:id", LinhasController.buscarShapes)


  export default router;   