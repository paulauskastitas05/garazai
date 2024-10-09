import pool from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      console.log('Gaunami vartotojai iš duomenu bazės');
      
      const [rows] = await pool.query('SELECT * FROM users');
      
      console.log('Vartotojai gauti:', rows);

      res.status(200).json(rows);
    } catch (error) {
      console.error('Nepavyko gauti vartotojų:', error);
      res.status(500).json({ message: 'Nepavyko gauti vartotojų' });
    }
  } else {
    res.status(405).json({ message: 'Metodas negalimas' });
  }
}
