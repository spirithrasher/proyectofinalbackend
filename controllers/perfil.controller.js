import { getUser,putUser } from '../models/perfil.model.js'

export const perfil= async (req ,res) => {
    const userId = req.params.id;
    try {
        const result = await getUser(userId)
        if(result == 404){
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const editarPerfil= async (req ,res) => {
    const userId = req.params.id;
    const { nombre, rut, direccion, telefono } = req.body;
    try {
        const result = await putUser(userId, nombre, rut, direccion, telefono)
        if(result == 404){
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.json({ message: "Perfil actualizado", user: result });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}