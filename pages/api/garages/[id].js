import pool from '../../../lib/db';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { name, address, city, tools } = req.body;

    if (!name || !address || !city || !tools) {
      return res.status(400).json({ message: 'Visi laukeliai (pavadinimas, adresas, miestas, įrankiai) yra privalomi' });
    }

    try {
      const toolsList = Array.isArray(tools) ? JSON.stringify(tools) : JSON.stringify([]);

      const result = await pool.query(
        'UPDATE garages SET name = ?, address = ?, city = ?, tools = ? WHERE id = ?',
        [name, address, city, toolsList, id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Garažas nerastas' });
      }

      return res.status(200).json({ message: 'Garažas sėkmingai atnaujintas' });
    } catch (error) {
      console.error('Klaida atnaujinant garažą:', error);
      return res.status(500).json({ message: 'Klaida atnaujinant garažą', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Metodas neleidžiamas' });
  }
}
