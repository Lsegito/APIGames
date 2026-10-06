const express = require('express');
const db = require('../config/db');

const router = express.Router();

function validarCorpo(body) {
  const { titulo, plataforma, genero } = body || {};
  if (!titulo || !plataforma || !genero) {
    return 'Campos obrigatorios: titulo, plataforma, genero';
  }
  return null;
}

function erroBanco(res, err) {
  console.error(err);
  return res.status(500).json({ erro: 'Erro de conexao ou execucao no banco de dados', detalhe: err.code });
}

// GET /jogo - lista todos
router.get('/', (req, res) => {
  db.query('SELECT id, titulo, plataforma, genero FROM jogo ORDER BY id', (err, rows) => {
    if (err) return erroBanco(res, err);
    res.json(rows);
  });
});

// GET /jogo/:id - busca um
router.get('/:id', (req, res) => {
  db.query('SELECT id, titulo, plataforma, genero FROM jogo WHERE id = ?', [req.params.id], (err, rows) => {
    if (err) return erroBanco(res, err);
    if (rows.length === 0) return res.status(404).json({ erro: 'Jogo nao encontrado' });
    res.json(rows[0]);
  });
});

// POST /jogo - cria
router.post('/', (req, res) => {
  const msg = validarCorpo(req.body);
  if (msg) return res.status(400).json({ erro: msg });

  const { titulo, plataforma, genero } = req.body;
  db.query(
    'INSERT INTO jogo (titulo, plataforma, genero) VALUES (?, ?, ?)',
    [titulo, plataforma, genero],
    (err, result) => {
      if (err) return erroBanco(res, err);
      res.status(201).json({ id: result.insertId, titulo, plataforma, genero });
    }
  );
});

// PUT /jogo/:id - atualiza
router.put('/:id', (req, res) => {
  const msg = validarCorpo(req.body);
  if (msg) return res.status(400).json({ erro: msg });

  const { titulo, plataforma, genero } = req.body;
  db.query(
    'UPDATE jogo SET titulo = ?, plataforma = ?, genero = ? WHERE id = ?',
    [titulo, plataforma, genero, req.params.id],
    (err, result) => {
      if (err) return erroBanco(res, err);
      if (result.affectedRows === 0) return res.status(404).json({ erro: 'Jogo nao encontrado' });
      res.json({ id: Number(req.params.id), titulo, plataforma, genero });
    }
  );
});

// DELETE /jogo/:id - remove
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM jogo WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return erroBanco(res, err);
    if (result.affectedRows === 0) return res.status(404).json({ erro: 'Jogo nao encontrado' });
    res.json({ mensagem: 'Jogo removido com sucesso' });
  });
});

module.exports = router;