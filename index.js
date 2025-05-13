import express from 'express';
import pkg from 'transbank-sdk';
import dotenv from 'dotenv';
const { WebpayPlus } = pkg;


const app = express();
const port = 3000;
dotenv.config();

// Configuración para el ambiente de integración
WebpayPlus.configureForIntegration(
  `${process.env.CODCOMERCIO}`, // Código de comercio de prueba
  `${process.env.LLAVE}` //llave 
);

// Ruta para crear una transacción
app.get('/crear-transaccion', async (req, res) => {
  const buyOrder = 'orden-' + Math.floor(Math.random() * 100000);
  const sessionId = 'session-' + Math.floor(Math.random() * 100000);
  const amount = 1000;
  const returnUrl = `${process.env.API_BASE_URL}:${process.env.PORT}/confirmar-pago`;

  try {
    const response = await new WebpayPlus.Transaction().create(
      buyOrder,
      sessionId,
      amount,
      returnUrl
    );

    console.log(response)

    res.redirect(`${response.url}?token_ws=${response.token}`);
  } catch (error) {
    console.error('Error al crear la transacción:', error);
    res.status(500).send('Error al crear la transacción');
  }
});

// Ruta para confirmar la transacción
app.get('/confirmar-pago', async (req, res) => {
  const token = req.query.token_ws;

  try {
    const transaction = new WebpayPlus.Transaction();
    const result = await transaction.commit(token);
    res.json(result);
  } catch (error) {
    console.error('Error al confirmar el pago:', error);
    res.status(500).send('Error al confirmar el pago');
  }
});

app.listen(port, () => {
  console.log(`Servidor Webpay corriendo en http://localhost:${port}`);
});
