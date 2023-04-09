import express from 'express';
import controller from '../controllers/login';
const router = express.Router();

router.post('/inserir', controller.inserir);
router.post('/posts/:id', controller.logar);
router.put('/posts/:id', controller.updatePost);
router.delete('/posts/:id', controller.deletePost);
router.post('/posts', controller.addPost);

export = router;