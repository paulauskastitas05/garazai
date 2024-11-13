import pool from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, password, phone } = req.body;

    // Validate phone input (only numbers and optional "+" prefix)
    const phoneRegex = /^\+?[0-9]{7,15}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ message: 'Neteisingas telefono numerio formatas' });
    }

    try {
      // Check if the user already exists
      const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
      if (existingUser.length > 0) {
        return res.status(400).json({ message: 'Vartotojas jau egzistuoja' });
      }

      // Insert the new user with the phone number
      await pool.query(
        'INSERT INTO users (name, email, password, role, phone) VALUES (?, ?, ?, ?, ?)',
        [name, email, password, 'user', phone]
      );

      const [newUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

      return res.status(201).json({
        id: newUser[0].id,
        name: newUser[0].name,
        email: newUser[0].email,
        role: newUser[0].role,
        phone: newUser[0].phone,
      });
    } catch (error) {
      console.error('Error registering user:', error);
      return res.status(500).json({ message: 'Nepavyko registruoti vartotojo' });
    }
  } else {
    return res.status(405).json({ message: 'Metodas negalimas' });
  }
}
