const app = require('./app');
require('dotenv').config();
const mongodbConnection = require('./db/connection');
const appPort = process.env.APP_PORT || 8080;

app.listen(appPort, async () => {
    await mongodbConnection();
    console.log(`Aplicação rodando em http://localhost:${appPort}`);
});
