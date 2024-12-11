import pool from '../../../lib/db';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const [user] = await pool.query('SELECT id, name, email, role FROM users WHERE id = ?', [id]);

      if (!user || user.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json(user[0]);
    } catch (error) {
      console.error('Error fetching user data:', error);
      return res.status(500).json({ message: 'Failed to fetch user data' });
    }
  } else if (req.method === 'PUT') {
    const { name, role } = req.body;

    try {
      const result = await pool.query('UPDATE users SET name = ?, role = ? WHERE id = ?', [name, role, id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json({ message: 'User successfully updated' });
    } catch (error) {
      console.error('Failed to update user:', error);
      return res.status(500).json({ message: 'Failed to update user' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
