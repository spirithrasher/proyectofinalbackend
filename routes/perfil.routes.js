import { Router } from "express";
import { perfil,editarPerfil } from "../controllers/perfil.controller.js";
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/perfil/:id', authenticateToken,perfil);
router.put('/users/:id', authenticateToken,editarPerfil);
// router.post('/login', login);
// router.get('/usuarios', verifyToken, getUser)

export default router;