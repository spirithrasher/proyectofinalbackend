import { Router } from "express";
import multer from 'multer';
import path from 'path';
import { productos,subirProducto,verProducto } from "../controllers/productos.controller.js";
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = Router();

// Configurar multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});

const upload = multer({ storage });

router.get('/productos',productos);
router.post('/productos',authenticateToken,upload.single('imagen'), subirProducto);
router.get('/productos/:id', authenticateToken,verProducto);
// router.post('/login', login);
// router.get('/usuarios', verifyToken, getUser)

export default router;
