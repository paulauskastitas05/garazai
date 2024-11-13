import pool from '../../../lib/db';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const [user] = await pool.query('SELECT id, name, email, phone, role FROM users WHERE id = ?', [id]);

      if (!user || user.length === 0) {
        return res.status(404).json({ message: 'Vartotojas nerastas' });
      }

      return res.status(200).json(user[0]);
    } catch (error) {
      console.error('Klaida gaunant vartotojo duomenis:', error);
      return res.status(500).json({ message: 'Nepavyko gauti vartotojo duomenų' });
    }
  } else if (req.method === 'PUT') {
    const { name, phone, role } = req.body;

    try {
      const result = await pool.query('UPDATE users SET name = ?, phone = ?, role = ? WHERE id = ?', [name, phone, role, id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Vartotojas nerastas' });
      }

      return res.status(200).json({ message: 'Vartotojas atnaujintas sėkmingai' });
    } catch (error) {
      console.error('Nepavyko atnaujinti vartotojo:', error);
      return res.status(500).json({ message: 'Nepavyko atnaujinti vartotojo' });
    }
  } else {
    res.status(405).json({ message: 'Metodas negalimas' });
  }
}
