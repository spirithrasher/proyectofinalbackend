import express from 'express';
import cors from "cors";
import pkg from 'transbank-sdk';
import dotenv from 'dotenv';
import webpayRoutes from './routes/webpay.routes.js'
const { WebpayPlus } = pkg;


const app = express();
const port = 3000;
dotenv.config();

const corsOptions = {
    origin: `${process.env.API_BASE_URL}:${process.env.PORT_REACT}`,  // Solo se permite el origen "http://example.com"
    methods: ['GET', 'POST', 'PUT', 'DELETE'],     // Solo se permiten los métodos GET y POST
    allowedHeaders: ['Content-Type', 'Authorization']  // Solo se permiten estos encabezados
  };

app.use(cors(corsOptions));
app.use('/',webpayRoutes);


app.listen(port, () => {
  console.log(`Servidor Webpay corriendo en http://localhost:${port}`);
});



// Ruta para crear una transacción
// app.get('/crear-transaccion', async (req, res) => {
//   const buyOrder = 'orden-' + Math.floor(Math.random() * 100000);
//   const sessionId = 'session-' + Math.floor(Math.random() * 100000);
//   const amount = 1000;
//   const returnUrl = `${process.env.API_BASE_URL}:${process.env.PORT}/confirmar-pago`;

//   try {
//     const response = await new WebpayPlus.Transaction().create(
//       buyOrder,
//       sessionId,
//       amount,
//       returnUrl
//     );

//     console.log(response)

//     res.redirect(`${response.url}?token_ws=${response.token}`);
//   } catch (error) {
//     console.error('Error al crear la transacción:', error);
//     res.status(500).send('Error al crear la transacción');
//   }
// });

// // Ruta para confirmar la transacción
// app.get('/confirmar-pago', async (req, res) => {
//   const token = req.query.token_ws;

//   try {
//     const transaction = new WebpayPlus.Transaction();
//     const result = await transaction.commit(token);
//     res.json(result);
//   } catch (error) {
//     console.error('Error al confirmar el pago:', error);
//     res.status(500).send('Error al confirmar el pago');
//   }
// });


