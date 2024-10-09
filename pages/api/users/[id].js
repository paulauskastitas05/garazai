import pool from '../../../lib/db';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { name, role } = req.body;

    console.log('Updating user with ID:', id, 'New Name:', name, 'New Role:', role);

    try {
      const result = await pool.query('UPDATE users SET name = ?, role = ? WHERE id = ?', [name, role, id]);

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
