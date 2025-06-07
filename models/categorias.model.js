import db from "../config/db.js"

export const getCategorias = async () => {
    const consulta = `SELECT * FROM categories`;
    const { rows } = await db.query(consulta)
    const result = rows
    return result
}