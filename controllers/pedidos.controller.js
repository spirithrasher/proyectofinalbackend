
import { misPedidos, } from '../models/pedidos.model.js'


export const pedidos= async (req ,res) => {
    const userId = req.params.id;
    try {
        const result = await misPedidos(userId)
        if(result == 404){
            return res.status(404).json({ message: "Error al buscar mis compras" });
        }
        res.json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}