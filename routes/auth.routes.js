import { Router } from "express";
import { login,registrar } from "../controllers/auth.controller.js";
// import { authenticateToken } from '../middlewares/authMiddleware.js'

const router = Router();

router.post('/register', registrar);
router.post('/login', login);
// router.get('/usuarios', verifyToken, getUser)

export default router;