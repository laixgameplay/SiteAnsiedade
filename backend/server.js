const express = require('express');
const Database = require('better-sqlite3');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// CRIAR/ABRIR BANCO
const db = new Database('banco.db');

// CRIAR TABELA
db.prepare(`
  CREATE TABLE IF NOT EXISTS mensagens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    texto TEXT
  )
`).run();

// SALVAR MENSAGEM
app.post('/mensagens', (req, res) => {
  const { texto } = req.body;

  const result = db
    .prepare('INSERT INTO mensagens (texto) VALUES (?)')
    .run(texto);

  res.json({ id: result.lastInsertRowid, texto });
});

// LISTAR MENSAGENS
app.get('/mensagens', (req, res) => {
  const mensagens = db
    .prepare('SELECT * FROM mensagens')
    .all();

  res.json(mensagens);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Servidor rodando");
});

app.get('/', (req, res) => {
  const mensagens = db
    .prepare('SELECT * FROM mensagens')
    .all();

  res.json(mensagens);
});

app.delete('/mensagens/:id', (req, res) => {
  const id = req.params.id;

  console.log("Deletando ID:", id);

  db.prepare('DELETE FROM mensagens WHERE id = ?').run(id);

  res.send("Mensagem deletada");
});

app.delete('/mensagens', (req, res) => {
  db.prepare('DELETE FROM mensagens').run();
  res.send("Todas as mensagens foram apagadas");
});

app.delete('/resetar', (req, res) => {
  // Apaga todas as mensagens
  db.prepare('DELETE FROM mensagens').run();

  // Reseta o auto incremento (ID volta pra 1)
  db.prepare('DELETE FROM sqlite_sequence WHERE name = "mensagens"').run();

  res.send("Banco resetado com sucesso!");
});