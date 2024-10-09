import pool from '../../../lib/db';

export default async function handler(req, res) {
  try {
    const [garages] = await pool.query('SELECT id, name, address FROM garages');
    res.status(200).json(garages);
  } catch (error) {
    console.error('Nepavyko gauti garažų:', error);
    res.status(500).json({ message: 'Nepavyko gauti garažų' });
  }
}
