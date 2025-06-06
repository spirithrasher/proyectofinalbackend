
import { misVentas, } from '../models/ventas.model.js'


export const ventas= async (req ,res) => {
    const userId = req.params.id;
    try {
        const result = await misVentas(userId)
        if(result == 404){
            return res.status(404).json({ message: "Error al buscar mis ventas" });
        }
        res.json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}