import pool from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const [garages] = await pool.query('SELECT * FROM garages');
      
      res.status(200).json(garages);
    } catch (error) {
      console.error('Nepavyko gauti garažų:', error);
      res.status(500).json({ message: 'Nepavyko įkelti garažų.' });
    }
  } else {
    res.status(405).json({ message: 'Metodas neleidžiamas' });
  }
}
