import express from 'express';
import controller from '../controllers/login-controller';
const router = express.Router();

router.post('/logar', controller.logar);

export = router;