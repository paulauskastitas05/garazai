import pool from '../../../lib/db';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      // Join garages and users tables to fetch garage and owner information
      const [result] = await pool.query(`
        SELECT 
          garages.*, 
          users.name AS ownerName, 
          users.email AS ownerEmail,
          users.phone AS ownerPhone
        FROM 
          garages 
        JOIN 
          users 
        ON 
          garages.ownerId = users.id
        WHERE 
          garages.id = ?
      `, [id]);

      if (!result || result.length === 0) {
        return res.status(404).json({ message: 'Garažas nerastas.' });
      }

      return res.status(200).json(result[0]);
    } catch (error) {
      console.error('Error fetching garage data:', error);
      return res.status(500).json({ message: 'Klaida gaunant garažo duomenis.', error: error.message });
    }
  } 
  else if (req.method === 'PUT') {
    const { name, address, city, tools } = req.body;

    if (!name || !address || !city || !tools) {
      return res.status(400).json({ message: 'Visi laukai (pavadinimas, adresas, miestas, įrankiai) yra privalomi.' });
    }

    try {
      const toolsJSON = JSON.stringify(tools);

      const result = await pool.query(
        'UPDATE garages SET name = ?, address = ?, city = ?, tools = ? WHERE id = ?',
        [name, address, city, toolsJSON, id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Garažas nerastas.' });
      }

      return res.status(200).json({ message: 'Garažas sėkmingai atnaujintas.' });
    } catch (error) {
      return res.status(500).json({ message: 'Klaida atnaujinant garažą.', error: error.message });
    }
  } 
  else if (req.method === 'DELETE') {
    try {
      const result = await pool.query('DELETE FROM garages WHERE id = ?', [id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Garažas nerastas.' });
      }

      return res.status(200).json({ message: 'Garažas sėkmingai ištrintas.' });
    } catch (error) {
      return res.status(500).json({ message: 'Klaida trinant garažą.', error: error.message });
    }
  } 
  else {
    res.status(405).json({ message: 'Metodas neleidžiamas.' });
  }
}
