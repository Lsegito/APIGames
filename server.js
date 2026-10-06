const app = require('./app');
const iniciarBanco = require('./config/init');

const PORT = process.env.PORT || 3000;

iniciarBanco(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
});