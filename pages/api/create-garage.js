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
        console.error('Error reading form:', err);
        return res.status(500).json({ message: 'Error reading form data', error: err.message });
      }

      const { name, address, city, tools, ownerId } = fields;

      if (!name || !address || !city || !tools || !ownerId) {
        console.error('Missing required fields');
        return res.status(400).json({ message: 'Name, address, city, tools, and ownerId are required.' });
      }

      let toolList;
      try {
        toolList = JSON.parse(tools);
      } catch (parseError) {
        console.error('Error parsing tools:', parseError);
        return res.status(400).json({ message: 'Tools field must be valid JSON format.', error: parseError.message });
      }

      const uploadedFiles = [];
      if (files) {
        try {
          Object.values(files).forEach((fileArray) => {
            (Array.isArray(fileArray) ? fileArray : [fileArray]).forEach((file) => {
              const newFileName = `${Date.now()}_${file.originalFilename}`;
              const filePath = path.join(uploadDir, newFileName);

              try {
                fs.renameSync(file.filepath, filePath);
                uploadedFiles.push(`/uploads/${newFileName}`);
              } catch (renameError) {
                console.error(`Error moving file ${file.originalFilename}:`, renameError);
              }
            });
          });
        } catch (fileError) {
          console.error('Error handling file uploads:', fileError);
          return res.status(500).json({ message: 'Error handling file uploads', error: fileError.message });
        }
      }

      if (uploadedFiles.length === 0) {
        console.warn('No files uploaded');
        return res.status(500).json({ message: 'Failed to upload any files' });
      }

      try {
        const result = await pool.query(
          'INSERT INTO garages (name, address, city, tools, ownerId, images) VALUES (?, ?, ?, ?, ?, ?)',
          [name, address, city, JSON.stringify(toolList), ownerId, JSON.stringify(uploadedFiles)]
        );

        console.log('Garage added to DB:', result);
        return res.status(200).json({ message: 'Garage created successfully!', garageId: result.insertId });
      } catch (dbError) {
        console.error('Error inserting garage into database:', dbError);
        return res.status(500).json({ message: 'Error inserting garage into database', error: dbError.message });
      }
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
