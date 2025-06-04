const express = require('express');
const cors = require('cors');

const app = express();

const dotenv = require('dotenv');
dotenv.config();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));

app.use(express.json());

const usuarioRoutes = require('./routes/usuarioRoutes');
const partitRoutes = require('./routes/partitRoutes');
const reservaRoutes = require('./routes/reservaRoutes');
const historialRoutes = require('./routes/historialRoutes');
const pagosRoutes = require('./routes/pagosRoutes');
const estatPagamentRoutes = require('./routes/estatPagamentRoutes');
const equipRoutes = require('./routes/equipRoutes');
const ubicacioRoutes = require('./routes/ubicacioRoutes');
const esportRoutes = require('./routes/esportRoutes');
const pistaRoutes = require('./routes/pistaRoutes');
const usuariPartitRoutes = require ('./routes/usuariPartitRoutes')

app.use('/usuarios', usuarioRoutes);
app.use('/partits', partitRoutes);
app.use('/reserves', reservaRoutes);
app.use('/historial', historialRoutes);
app.use('/pagos', pagosRoutes);
app.use('/estat_pagament', estatPagamentRoutes);
app.use('/ubicacions', ubicacioRoutes);
app.use('/esports', esportRoutes);
app.use('/pistas', pistaRoutes);
app.use('/usuariPartit', usuariPartitRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

app.use((req, res, next) => {
  console.log(`Ruta no encontrada: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo salió mal, por favor intenta de nuevo más tarde.' });
});

