import db from "../config/db.js"

export const getUser = async (id) => {
    const consulta = "SELECT * FROM users WHERE id = $1"
    const values = [id]
    const { rows } = await db.query(consulta, values)
    const result = rows[0]
    
    if (!result) {
      return 404;
    }

    return result
}

export const putUser = async (id,nombre, rut,direccion, telefono) => {
    const consulta = "UPDATE users SET name = $1, rut = $2, direccion = $3, telefono = $4 WHERE id = $5 RETURNING *"
    const values = [nombre, rut,direccion, telefono,id]
    const { rows } = await db.query(consulta, values)
    const result = rows[0]
    
    if (!result) {
      return 404;
    }

    return result
}