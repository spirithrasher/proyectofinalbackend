import { Router } from "express";
import { creartransaccion,confirmarpago } from "../controllers/webpay.controller.js";

const router = Router();

router.post('/crear-transaccion', creartransaccion);
router.get('/confirmar-pago', confirmarpago);
// router.get('/confirmar-pago', confirmarpago);

export default router;