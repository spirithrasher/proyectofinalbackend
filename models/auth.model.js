import db from "../config/db.js"
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const SECRET = process.env.JWT_SECRET;

export const findUser = async (email) => {
    const consulta = "SELECT * FROM users WHERE email = $1"
    const values = [email]
    const { rows } = await db.query(consulta, values)
    return rows[0]
}

export const verificarCredenciales = async (email,password) => {
    // 1. Buscar usuario en la base de datos
    const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    const user = result.rows[0];

    if (!user) {
      return 401;
    }

    // 2. Verificar contraseña
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return 401;
    }

    // 3. Generar JWT
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET, {
      expiresIn: "1h",
    });

    // 4. Devolver token y datos del usuario (sin la contraseña)
    const { password: _, ...userWithoutPassword } = user;
    return { token, user: userWithoutPassword };
}

export const registerUser = async (name,email,password) => {

    const consulta = "INSERT INTO users values (DEFAULT, $1, $2, $3) RETURNING *"
    const values = [name,email,password]
    const {rows } = await db.query(consulta, values)
    return rows[0]
}





