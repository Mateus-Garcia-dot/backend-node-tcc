import express from 'express';
import controller from '../controllers/usuario-controller';
const router = express.Router();

router.post('/cadastrar', controller.cadastrar);

export = router;