const express = require('express');
const app = express();
const cors = require('cors');

//Rotas
const mainRoutes = require('./routes');

//Configuração de CORS
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());

//Configuração de rotas
app.use('/api', mainRoutes);

module.exports = app;