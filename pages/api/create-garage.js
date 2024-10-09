import { formidable } from 'formidable';
import fs from 'fs';
import path from 'path';
import pool from '../../lib/db';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = formidable({
      uploadDir: path.join(process.cwd(), 'public/uploads'),
      keepExtensions: true,
      multiples: true,
    });

    const uploadDir = path.join(process.cwd(), 'public/uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Klaida nuskaitant formą:', err);
        return res.status(500).json({ message: 'Klaida nuskaitant formos duomenis', error: err.message });
      }

      const { name, address, city, tools } = fields;

      if (!name || !address || !city || !tools) {
        console.error('Trūksta privalomų laukelių');
        return res.status(400).json({ message: 'Pavadinimas, adresas, miestas ir įrankiai yra privalomi.' });
      }

      let toolList = [];
      try {
        toolList = JSON.parse(tools);
      } catch (parseError) {
        console.error('Klaida nuskaitant įrankius:', parseError);
        return res.status(400).json({ message: 'Įrankių laukas nėra tinkamas JSON formatas.', error: parseError.message });
      }

      if (!files || Object.keys(files).length === 0) {
        console.error('Failai nebuvo įkelti');
        return res.status(400).json({ message: 'Nėra įkeltų failų' });
      }

      const uploadedFiles = [];

      try {
        Object.values(files).forEach((fileArray) => {
          fileArray.forEach((file) => {
            if (!file || !file.filepath) {
              console.error('Failas neturi nurodyto kelio');
              return;
            }

            const newFileName = `${Date.now()}_${file.originalFilename}`;
            const filePath = path.join(uploadDir, newFileName);

            try {
              fs.renameSync(file.filepath, filePath);
              uploadedFiles.push(`/uploads/${newFileName}`);
            } catch (renameError) {
              console.error(`Klaida perkeliant failą ${file.originalFilename}:`, renameError);
            }
          });
        });
      } catch (fileError) {
        console.error('Klaida tvarkant failų įkėlimą:', fileError);
        return res.status(500).json({ message: 'Klaida tvarkant failų įkėlimą', error: fileError.message });
      }

      if (uploadedFiles.length === 0) {
        return res.status(500).json({ message: 'Nepavyko įkelti jokių failų' });
      }

      try {
        const result = await pool.query(
          'INSERT INTO garages (name, address, city, tools, images) VALUES (?, ?, ?, ?, ?)',
          [name, address, city, JSON.stringify(toolList), JSON.stringify(uploadedFiles)]
        );

        console.log('Garažas pridėtas į DB:', result);
        return res.status(200).json({ message: 'Garažas sėkmingai sukurtas!' });
      } catch (dbError) {
        console.error('Klaida įrašant garažą į duomenų bazę:', dbError);
        return res.status(500).json({ message: 'Klaida įrašant garažą į duomenų bazę', error: dbError.message });
      }
    });
  } else {
    res.status(405).json({ message: 'Metodas neleidžiamas' });
  }
}
