import pool from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;

    try {
      const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
      if (existingUser.length > 0) {
        return res.status(400).json({ message: 'Vartotojas jau egzistuoja' });
      }


      await pool.query('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', [
        name,
        email,
        password, 
        'user', 
      ]);

      const [newUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

      return res.status(201).json({
        id: newUser[0].id,
        name: newUser[0].name,
        email: newUser[0].email,
        role: newUser[0].role,
      });
    } catch (error) {
      return res.status(500).json({ message: 'Nepavyko registruoti vartotojo' });
    }
  } else {
    return res.status(405).json({ message: 'Metodas negalimas' });
  }
}