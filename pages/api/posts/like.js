import pool from '../../../lib/db';

export default async function handler(req, res) {
  const { postId } = req.query; // Extract postId from query parameters
  const { userId } = req.body; // Extract userId from request body

  if (!postId) {
    return res.status(400).json({ message: 'Post ID is required' });
  }

  if (req.method === 'POST') {
    try {
      // Check if the user has already liked the post
      const [existingLike] = await pool.query(
        'SELECT * FROM likes WHERE user_id = ? AND post_id = ?',
        [userId, postId]
      );

      if (existingLike.length > 0) {
        // Unlike the post
        await pool.query('DELETE FROM likes WHERE user_id = ? AND post_id = ?', [userId, postId]);
        await pool.query('UPDATE posts SET likes = likes - 1 WHERE id = ?', [postId]); // Decrement likes
        const [likesCount] = await pool.query('SELECT likes FROM posts WHERE id = ?', [postId]);
        return res.status(200).json({ message: 'Like removed', liked: false, likes: likesCount[0].likes });
      } else {
        // Add a like
        await pool.query('INSERT INTO likes (user_id, post_id) VALUES (?, ?)', [userId, postId]);
        await pool.query('UPDATE posts SET likes = likes + 1 WHERE id = ?', [postId]); // Increment likes
        const [likesCount] = await pool.query('SELECT likes FROM posts WHERE id = ?', [postId]);
        return res.status(200).json({ message: 'Post liked', liked: true, likes: likesCount[0].likes });
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      return res.status(500).json({ message: 'Error toggling like', error: error.message });
    }
  } else if (req.method === 'GET') {
    const { userId } = req.query; // Include userId in the GET query
    try {
      // Get the total number of likes for the post
      const [likesCount] = await pool.query('SELECT likes FROM posts WHERE id = ?', [postId]);

      // Check if the current user has liked the post
      const [existingLike] = await pool.query(
        'SELECT * FROM likes WHERE user_id = ? AND post_id = ?',
        [userId, postId]
      );

      return res.status(200).json({
        likes: likesCount[0]?.likes || 0,
        liked: existingLike.length > 0,
      });
    } catch (error) {
      console.error('Error fetching likes:', error);
      return res.status(500).json({ message: 'Error fetching likes', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
