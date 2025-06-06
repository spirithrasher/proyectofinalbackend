import db from "../config/db.js"

export const procesarCheckout = async (req, res) => {
  const client = await db.connect();
  try {
    const { cartItems, buyerId, amount, transbankToken } = req.body;

    await client.query('BEGIN');

    // 1. Crear orden
    const orderResult = await client.query(
      `INSERT INTO orders (buyer_id) VALUES ($1) RETURNING id`,
      [buyerId]
    );
    const orderId = orderResult.rows[0].id;

    // 2. Insertar productos en order_items
    for (const item of cartItems) {
      await client.query(
        `INSERT INTO order_items (order_id, product_id, quantity, unit_price) 
         VALUES ($1, $2, $3, $4)`,
        [orderId, item.id, item.quantity, item.price]
      );
    }


    


    // 3. Insertar transacción para el comprador
    await client.query(
      `INSERT INTO transactions (user_id, order_id, role) VALUES ($1, $2, 'buyer')`,
      [buyerId, orderId]
    );

    // 4. Insertar transacciones para vendedores (opcional si tienes múltiples vendedores)
    for (const item of cartItems) {
      const sellerResult = await client.query(
        `SELECT user_id FROM products WHERE id = $1`,
        [item.id]
      );
      const sellerId = sellerResult.rows[0]?.user_id;
      if (sellerId && sellerId !== buyerId) {
        await client.query(
          `INSERT INTO transactions (user_id, order_id, role) VALUES ($1, $2, 'seller')`,
          [sellerId, orderId]
        );
      }
    }

    // 5. Crear pago (si aplica)
    if (transbankToken) {
      await client.query(
        `INSERT INTO payments (order_id, transbank_token, amount, status, paid_at)
         VALUES ($1, $2, $3, $4, NOW())`,
        [orderId, transbankToken, amount, 'authorized']
      );
    }

    await client.query('COMMIT');
    res.status(201).json({ success: true, orderId });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error("Error en checkout:", err);
    res.status(500).json({ error: 'Error al procesar el checkout' });
  } finally {
    client.release();
  }
};