import pool from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const [rows] = await pool.query('SELECT * FROM users');
      res.status(200).json(rows);
    } catch (error) {
      console.error('Nepavyko gauti vartotojų:', error);
      res.status(500).json({ message: 'Nepavyko gauti vartotojų' });
    }
  } else {
    res.status(405).json({ message: 'Metodas negalimas' });
  }
}
