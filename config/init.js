const mysql = require('mysql');

// Cria o banco e a tabela automaticamente se ainda nao existirem
function iniciarBanco(callback) {
  const conn = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true
  });

  const nomeBanco = process.env.DB_NAME || 'estudio_games';

  const sql = `
    CREATE DATABASE IF NOT EXISTS \`${nomeBanco}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
    USE \`${nomeBanco}\`;
    CREATE TABLE IF NOT EXISTS jogo (
      id INT AUTO_INCREMENT PRIMARY KEY,
      titulo VARCHAR(150) NOT NULL,
      plataforma VARCHAR(80) NOT NULL,
      genero VARCHAR(80) NOT NULL
    );
  `;

  conn.query(sql, (err) => {
    conn.end();
    if (err) {
      console.error('Nao foi possivel preparar o banco de dados:', err.code || err.message);
      console.error('Verifique se o MySQL/MariaDB esta ligado e se usuario/senha em config/db.js estao corretos.');
    } else {
      console.log('Banco de dados pronto.');
    }
    callback();
  });
}

module.exports = iniciarBanco;