const express = require('express');
const cors = require('cors');

const app = express();

const dotenv = require('dotenv');
dotenv.config();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));
// Middleware para manejar JSON
app.use(express.json());

// Importar las rutas
const usuarioRoutes = require('./routes/usuarioRoutes');
const partitRoutes = require('./routes/partitRoutes');
const reservaRoutes = require('./routes/reservaRoutes');
const historialRoutes = require('./routes/historialRoutes');
const pagosRoutes = require('./routes/pagosRoutes');
const estatPagamentRoutes = require('./routes/estatPagamentRoutes');
const equipRoutes = require('./routes/equipRoutes');
const ubicacioRoutes = require('./routes/ubicacioRoutes');
const esportRoutes = require('./routes/esportRoutes');
const estatReservaRoutes = require('./routes/estatReservaRoutes');
const estatPartitRoutes = require('./routes/estatPartitRoutes');
const pistaRoutes = require('./routes/pistaRoutes');

// Usar las rutas
app.use('/usuarios', usuarioRoutes);
app.use('/partits', partitRoutes);
app.use('/reservas', reservaRoutes);
app.use('/historial', historialRoutes);
app.use('/pagos', pagosRoutes);
app.use('/estat_pagament', estatPagamentRoutes);
app.use('/equips', equipRoutes);
app.use('/ubicacions', ubicacioRoutes);
app.use('/esports', esportRoutes);
app.use('/estat_reserva', estatReservaRoutes);
app.use('/estat_partit', estatPartitRoutes);
app.use('/pistas', pistaRoutes);

// Puerto donde se ejecutará el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Middleware para manejar errores no capturados
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo salió mal, por favor intenta de nuevo más tarde.' });
});

