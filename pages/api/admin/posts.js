import pool from '../../../lib/db';

export default async function handler(req, res) {
  try {
    // Fetch posts from the database
    const [posts] = await pool.query('SELECT id, title, category, event_time, likes FROM posts');
    res.status(200).json(posts);
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
}
