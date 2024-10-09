import pool from '../../lib/db';
import bcrypt from 'bcrypt'; 

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

      if (rows.length === 0) {
        return res.status(401).json({ message: 'Neteisingas email arba slaptažodis' });
      }

      const user = rows[0];

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Neteisingas email arba slaptažodis' });
      }

      return res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ message: 'Metodas negalimas' });
  }
}
