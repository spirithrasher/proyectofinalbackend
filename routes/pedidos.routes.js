import { Router } from "express";
import { pedidos,getPedidos } from "../controllers/pedidos.controller.js";
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/pedidos/:id', authenticateToken,pedidos);
router.get('/orders', authenticateToken,getPedidos);

export default router;