import { getCategorias } from '../models/categorias.model.js'

export const categorias= async (req ,res) => {
    try {
        const result = await getCategorias()
        res.json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}