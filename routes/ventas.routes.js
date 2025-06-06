import { Router } from "express";
import { ventas } from "../controllers/ventas.controller.js";
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/ventas/:id', authenticateToken,ventas);

export default router;