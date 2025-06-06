import express from 'express';
import cors from "cors";
import dotenv from 'dotenv';
import webpayRoutes from './routes/webpay.routes.js'
import authRoutes from './routes/auth.routes.js'
import perfilRoutes from './routes/perfil.routes.js'

const app = express();
dotenv.config();
const port = 3000;


const corsOptions = {
    origin: `${process.env.API_BASE_URL}:${process.env.PORT_REACT}`,  // Solo se permite el origen "http://example.com"
    methods: ['GET', 'POST', 'PUT', 'DELETE'],     // Solo se permiten los métodos GET y POST
    allowedHeaders: ['Content-Type', 'Authorization']  // Solo se permiten estos encabezados
  };

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/',webpayRoutes);
app.use("/", authRoutes);
app.use("/", perfilRoutes);


app.listen(port, () => {
  console.log(`Servidor Webpay corriendo en http://localhost:${port}`);
});


