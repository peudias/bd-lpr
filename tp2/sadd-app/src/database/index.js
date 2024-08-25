const express = require("express");
const mariadb = require("mariadb");
const cors = require("cors");

// Cria o pool de conexões
const pool = mariadb.createPool({
  host: "127.0.0.1",
  port: "3306",
  user: "root",
  password: "admin",
  database: "biblioteca",
  connectionLimit: 5,
  connectTimeout: 20000,
});

// Verifica se a conexão foi bem sucedida
pool
  .getConnection()
  .then((conn) => {
    console.log("Conexão com o banco de dados estabelecida.");
    conn.end();
  })
  .catch((erro) => {
    console.log("Erro ao conectar com o banco de dados:", erro);
  });

const app = express();
const port = 3001;

app.use(cors());

// Define uma rota para buscar usuários
app.get("/api/users", async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM usuarios");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (conn) conn.end(); // Libera a conexão
  }
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
