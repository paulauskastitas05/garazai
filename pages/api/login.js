import pool from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const [user] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
      
      if (user.length === 0) {
        return res.status(401).json({ message: 'User not found' });
      }

      if (user[0].password !== password) {
        return res.status(401).json({ message: 'Incorrect password' });
      }

      return res.status(200).json({
        id: user[0].id,
        name: user[0].name,
        email: user[0].email,
        role: user[0].role,
      });
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ message: 'Failed to log in' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
