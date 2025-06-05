const mongoose = require('mongoose');
require('dotenv').config();
const mongodbUrl = process.env.MONGODB_URL;

const mongodbConnection = async () => {
    try {
        await mongoose.connect(mongodbUrl);
        console.log('Conexão com o banco de dados mongodb realizada com sucesso!');
    } catch (error) {
        console.error(`Erro ao realizar conexão com o banco de dados mongodb: ${error}`);
    }
}

module.exports = mongodbConnection;