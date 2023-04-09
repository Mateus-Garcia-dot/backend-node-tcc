import express from 'express';
import controller from '../controllers/login';
const router = express.Router();

router.post('/inserir', controller.inserir);
router.post('/logar', controller.logar);
router.put('/atualizar', controller.atualizar);
router.delete('/excluir', controller.excluir);

export = router;