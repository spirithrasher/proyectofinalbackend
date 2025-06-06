import { Router } from "express";
import { pedidos } from "../controllers/pedidos.controller.js";
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/pedidos/:id', authenticateToken,pedidos);

export default router;