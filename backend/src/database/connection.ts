import mysql from 'mysql2';
import { config } from './config';

// Crie uma conexão com o banco de dados
const connection = mysql.createConnection(config);

// Conectar ao banco de dados
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    return;
  }
  console.log('Conectado ao MySQL com sucesso!');
});

export { connection };
