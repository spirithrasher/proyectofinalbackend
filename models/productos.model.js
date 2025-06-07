import db from "../config/db.js"

export const getProductos = async () => {
    const consulta = "SELECT * FROM products "
    const { rows } = await db.query(consulta)
    const result = rows
    return result
}

export const getProducto = async (id) => {
    const consulta = "SELECT * FROM products WHERE id = $1 ";
    const values = [id]
    const { rows } = await db.query(consulta,values)
    const result = rows[0]
    return result
}