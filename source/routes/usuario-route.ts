import express from 'express';
import controller from '../controllers/usuario-controller';
const router = express.Router();

router.post('/cadastrar', controller.cadastrar);

router.get('/usuarios/:usuarioId/linhasFavoritas', controller.buscarLinhasFavoritas);
router.post('/usuarios/:usuarioId/linhasFavoritas', controller.favoritarLinha);
router.delete('/usuarios/:usuarioId/linhasFavoritas', controller.desfavoritarLinha);

export = router;