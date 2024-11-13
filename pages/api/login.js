import pool from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      // Fetch the user from the database
      const [user] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
      
      // If the user does not exist, return a 401 error
      if (user.length === 0) {
        return res.status(401).json({ message: 'Vartotojas nerastas' });
      }

      // Check if the plain text password matches the one in the database
      if (user[0].password !== password) {
        return res.status(401).json({ message: 'Neteisingas slaptažodis' });
      }

      // Return user data if authentication is successful
      return res.status(200).json({
        id: user[0].id,
        name: user[0].name,
        email: user[0].email,
        role: user[0].role,
        phone: user[0].phone,
      });
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ message: 'Nepavyko prisijungti' });
    }
  } else {
    res.status(405).json({ message: 'Metodas negalimas' });
  }
}
