import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'garage_rental',
  charset: 'utf8mb4',
});

export default db;
