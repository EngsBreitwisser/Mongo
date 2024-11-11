const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/config.js');
const userRoute = require('./routes/userRoute.js');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB conectado!'))
  .catch((error) => console.error('Erro ao conectar ao MongoDB:', error));

app.use('/api', userRoute);

app.listen(config.port, () => console.log(`Servidor rodando em http://localhost:${config.port}`));
