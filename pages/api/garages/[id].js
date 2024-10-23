import pool from '../../../lib/db';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const [garage] = await pool.query('SELECT * FROM garages WHERE id = ?', [id]);

      if (garage.length === 0) {
        return res.status(404).json({ message: 'Garažas nerastas.' });
      }

      return res.status(200).json(garage[0]);
    } catch (error) {
      return res.status(500).json({ message: 'Klaida gaunant garažo duomenis.', error: error.message });
    }
  } 
  else if (req.method === 'PUT') {
    const { name, address, city, tools } = req.body;

    if (!name || !address || !city || !tools) {
      return res.status(400).json({ message: 'Visi laukai (pavadinimas, adresas, miestas, įrankiai) yra privalomi.' });
    }

    try {
      let toolsList;
      if (typeof tools === 'string') {
        try {
          toolsList = JSON.parse(tools); 
        } catch (error) {
          return res.status(400).json({ message: 'Įrankiai nėra tinkamai suformuoti.' });
        }
      } else if (Array.isArray(tools)) {
        toolsList = tools; 
      } else {
        return res.status(400).json({ message: 'Netinkama įrankių forma.' });
      }

      const toolsJSON = JSON.stringify(toolsList);

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