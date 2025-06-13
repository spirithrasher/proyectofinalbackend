import express from 'express';
import cors from "cors";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import webpayRoutes from './routes/webpay.routes.js'
import authRoutes from './routes/auth.routes.js'
import perfilRoutes from './routes/perfil.routes.js'
import pedidosRoutes from './routes/pedidos.routes.js'
import ventasRoutes from './routes/ventas.routes.js'
import categoriasRoutes from './routes/categorias.routes.js'
import productosRoutes from './routes/productos.routes.js'

const app = express();
dotenv.config();
const port = 3000;


const corsOptions = {
    origin: `${process.env.API_BASE_URL}`,  // Solo se permite el origen "http://example.com"
    methods: ['GET', 'POST', 'PUT', 'DELETE'],     // Solo se permiten los métodos GET y POST
    allowedHeaders: ['Content-Type', 'Authorization']  // Solo se permiten estos encabezados
  };

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Servir imágenes
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/',webpayRoutes);
app.use("/", authRoutes);
app.use("/", perfilRoutes);
app.use("/", pedidosRoutes);
app.use("/", ventasRoutes);
app.use("/", categoriasRoutes);
app.use("/", productosRoutes);


app.listen(port, () => {
  console.log(`Servidor Webpay corriendo en http://localhost:${port}`);
});

export default app;
