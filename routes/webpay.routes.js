import { Router } from "express";
import { creartransaccion,confirmarpago } from "../controllers/webpay.controller.js";

const router = Router();

router.get('/crear-transaccion', creartransaccion);
router.get('/confirmar-pago', confirmarpago);

export default router;