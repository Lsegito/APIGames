const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const jogoRoutes = require('./routes/jogo');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.json({ mensagem: 'API Estudio de Games no ar' }));
app.use('/jogo', jogoRoutes);

app.use((req, res) => res.status(404).json({ erro: 'Rota nao encontrada' }));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ erro: err.message || 'Erro interno' });
});

module.exports = app;