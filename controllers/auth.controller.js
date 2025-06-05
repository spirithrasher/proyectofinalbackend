import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { verificarCredenciales, findUser,registerUser } from '../models/auth.model.js'

const SECRET = process.env.JWT_SECRET;

export const login= async (req ,res) => {
    try {
        console.log(req.body)
        const { email, password } = req.body
        const user_login = await verificarCredenciales(email,password)
        console.log(user_login)
        if (user_login == 401){
            return res.status(401).json({ message: "Credenciales inválidas" });
        }else{
            res.json({ user_login });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const registrar= async (req ,res) => {
   
    const {name,email, password } = req.body || {};
    
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    try {

        // Verificar si ya existe un usuario con ese email
        const existingUser = await findUser(email);
        console.log(existingUser)
        if (existingUser) {
            return res.status(409).json({ message: "El email ya está registrado" });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar nuevo usuario
        const newUser = await registerUser(name,email,hashedPassword)

        // Generar token JWT
        const token = jwt.sign({ id: newUser.id, email: newUser.email }, SECRET, {
            expiresIn: "1h",
        });

        res.status(201).json({ token, user: newUser });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}