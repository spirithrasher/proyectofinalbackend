import db from "../config/db.js"

export const misPedidos = async (id) => {
    const consulta = `SELECT
                        o.id AS order_id,
                        o.created_at,
                        p.name AS product_name,
                        oi.quantity,
                        oi.unit_price,
                        (oi.quantity * oi.unit_price) AS total_price,
                        pay.status AS payment_status,
                        o.status AS orden_status
                        FROM orders o
                        JOIN order_items oi ON o.id = oi.order_id
                        JOIN products p ON oi.product_id = p.id
                        LEFT JOIN payments pay ON o.id = pay.order_id
                        WHERE o.buyer_id = $1
                        ORDER BY o.created_at DESC
                    `;
    const values = [id]
    const { rows } = await db.query(consulta, values)
    const result = rows
    
    if (!result) {
      return 404;
    }

    return result
}