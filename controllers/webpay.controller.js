import pkg from 'transbank-sdk';
import dotenv from 'dotenv';
import db from "../config/db.js"
const { WebpayPlus } = pkg;

dotenv.config();

// Configuración para el ambiente de integración
WebpayPlus.configureForIntegration(
  `${process.env.CODCOMERCIO}`, // Código de comercio de prueba
  `${process.env.LLAVE}` //llave 
);

export const creartransaccion= async (req ,res) => {

    const { buyerId, items } = req.body;
    console.log(buyerId,items)
    
    const sessionId = 'session-' + Math.floor(Math.random() * 100000);
    console.log("creartransaccion::: ",`${process.env.API_BASE_URL}/confirmar-pago`)
    const returnUrl = `${process.env.API_BASE_URL}/confirmar-pago`;

    try {

      // 1. Crear la orden en la base de datos
      const result = await db.query(
        'INSERT INTO orders (buyer_id,status) VALUES ($1,$2) RETURNING id',
        [buyerId,'pendiente']
      );
      const orderId = result.rows[0].id;
      console.log('orderid: ',orderId)
      const buyOrder = 'orden-' + orderId;
      let totalAmount = 0;

      // 2. Agregar los productos a order_items
      for (const item of items) {
        totalAmount += item.quantity * item.unit_price;
        
        await db.query(
          'INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES ($1, $2, $3, $4)',
          [orderId, item.product_id, item.quantity, item.unit_price]
        );
      }
      const amount = totalAmount;
      // 3. Crear transacción en Webpay
      const response = await new WebpayPlus.Transaction().create(
      buyOrder,
      sessionId,
      amount,
      returnUrl
      );

      // 4. Guardar token y pago en DB
      await db.query(
        'INSERT INTO payments (order_id, transbank_token, amount, status) VALUES ($1, $2, $3, $4)',
        [orderId, response.token, totalAmount, 'iniciado']
      );

      res.json({ url: response.url, token: response.token });

      // res.redirect(`${response.url}?token_ws=${response.token}`);
    } catch (error) {
        console.error('Error al crear la transacción:', error);
        res.status(500).send('Error al crear la transacción');
    }
}

export const confirmarpago= async (req ,res) => {
  console.log("Body recibido de Webpay:", req.query);
  const { token_ws } = req.query;

  try {
    const transaction = new WebpayPlus.Transaction();
    const result = await transaction.commit(token_ws);
    const { buy_order, status, amount } = result;
    const orderId = parseInt(buy_order.replace("orden-", ""));

    // Actualizar el pago
    await db.query(
      'UPDATE payments SET status = $1, paid_at = NOW() WHERE transbank_token = $2',
      [status, token_ws]
    );

    // Insertar transacción del comprador
    const orden = await db.query('SELECT buyer_id,status FROM orders WHERE id = $1', [orderId]);
    await db.query(
      'INSERT INTO transactions (user_id, order_id, role) VALUES ($1, $2, $3)',
      [orden.rows[0].buyer_id, orderId, 'buyer']
    );

    const payment = await db.query('SELECT status FROM payments WHERE order_id = $1', [orderId]);
    console.log('payment: ',payment.rows[0].status)
    if(payment.rows[0].status == "FAILED"){
      // Marcar orden como pagada
      await db.query('UPDATE orders SET status = $1 WHERE id = $2', ['fallido', orderId]);
      // ✅ Redirige al frontend
      res.redirect(`${process.env.FRONTEND_URL}/pago-error?token_ws=${token_ws}`);
    }else{
      // Marcar orden como pagada
      await db.query('UPDATE orders SET status = $1 WHERE id = $2', ['pagado', orderId]);
      // ✅ Redirige al frontend
      res.redirect(`${process.env.FRONTEND_URL}/pago-exitoso?token_ws=${token_ws}`);
    }

    
  } catch (error) {
    console.error('Error al confirmar el pago:', error);
    res.status(500).send('Error al confirmar el pago');
  }
}