import db from "../config/db.js"

export const misVentas = async (id) => {
    const consulta = `SELECT
                        o.id AS order_id,
                        o.created_at,
                        p.name AS product_name,
                        oi.quantity,
                        oi.unit_price,
                        (oi.quantity * oi.unit_price) AS total_earned,
                        u.name AS buyer_name,
                        pay.status AS payment_status
                    FROM order_items oi
                    JOIN products p ON oi.product_id = p.id
                    JOIN orders o ON oi.order_id = o.id
                    JOIN users u ON o.buyer_id = u.id
                    LEFT JOIN payments pay ON o.id = pay.order_id
                    WHERE p.seller_id = $1
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