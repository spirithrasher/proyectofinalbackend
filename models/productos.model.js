import db from "../config/db.js"

export const getProductos = async () => {
    const consulta = "SELECT * FROM products "
    const { rows } = await db.query(consulta)
    const result = rows
    return result
}