import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import pool from '../../lib/db';

export const config = {
  api: {
    bodyParser: false, // Disable body parsing
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const form = formidable({
    uploadDir: path.join(process.cwd(), 'public/uploads'), // Set upload directory
    keepExtensions: true, // Preserve file extensions
    multiples: true, // Allow multiple files
  });

  const uploadDir = path.join(process.cwd(), 'public/uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true }); // Ensure upload directory exists
  }

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing form:', err);
      return res.status(500).json({ message: 'Error parsing form', error: err.message });
    }

    console.log('Fields:', fields);
    console.log('Files:', files);

    const { title, content, category, event_time, userId } = fields;

    // Ensure all required fields are present
    if (!title || !content || !category || !event_time || !userId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Handle file uploads
    const uploadedFiles = [];
    for (const key in files) {
      if (key.startsWith('images')) {
        const fileArray = Array.isArray(files[key]) ? files[key] : [files[key]];
        fileArray.forEach((file) => {
          const newFileName = `${Date.now()}_${file.originalFilename}`;
          const newPath = path.join(uploadDir, newFileName);

          try {
            fs.renameSync(file.filepath, newPath); // Move the file to the uploads directory
            uploadedFiles.push(`/uploads/${newFileName}`); // Save relative path for database
          } catch (error) {
            console.error('Error moving file:', error);
          }
        });
      }
    }

    console.log('Uploaded Files:', uploadedFiles); // Log uploaded files for debugging

    // Save post and images in the database
    try {
      const query = `
        INSERT INTO posts (title, content, category, event_time, user_id, images)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      const values = [
        title[0],
        content[0],
        category[0],
        new Date(event_time[0]),
        userId[0],
        JSON.stringify(uploadedFiles), // Store as JSON string in database
      ];

      const [result] = await pool.query(query, values);
      return res.status(200).json({ message: 'Post created successfully', postId: result.insertId });
    } catch (dbError) {
      console.error('Database error:', dbError);
      return res.status(500).json({ message: 'Database error', error: dbError.message });
    }
  });
};
