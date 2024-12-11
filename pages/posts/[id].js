import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Header from '../../src/components/Header';
import Footer from '../../src/components/Footer';
import styles from './Post.module.css';
import { postCategories } from '../../src/data/postCategories';

export default function PostDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [user, setUser] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ title: '', category: '', event_time: '', content: '' });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (id && user) {
      const fetchPostAndLikes = async () => {
        try {
          // Fetch post details
          const postResponse = await fetch(`/api/posts/${id}`);
          const postData = await postResponse.json();
          setPost(postData);

          // Fetch like details
          const likeResponse = await fetch(`/api/posts/like?postId=${id}&userId=${user.id}`);
          const likeData = await likeResponse.json();
          setLikes(likeData.likes);
          setLiked(likeData.liked); // Set whether the user has liked this post
        } catch (error) {
          console.error('Failed to load post and likes:', error);
        }
      };

      fetchPostAndLikes();
    }
  }, [id, user]);


  // Handle like/unlike
  const handleLike = async () => {
    if (!user) {
      alert('You must be logged in to like this post.');
      return;
    }

    try {
      const response = await fetch(`/api/posts/like?postId=${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id }),
      });
      const data = await response.json();
      setLiked(data.liked); // Update like state
      setLikes(data.likes); // Update likes count
    } catch (error) {
      console.error('Failed to toggle like:', error);
    }
  };


  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setPost({ ...post, ...formData });
        setIsEditing(false);
        alert('Post updated successfully!');
      } else {
        alert('Failed to update post.');
      }
    } catch (error) {
      console.error('Failed to update post:', error);
      alert('An error occurred.');
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        const response = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
        if (response.ok) {
          alert('Post deleted successfully.');
          router.push('/');
        } else {
          alert('Failed to delete post.');
        }
      } catch (error) {
        console.error('Failed to delete post:', error);
        alert('An error occurred.');
      }
    }
  };

  if (!post) {
    return <p>Loading...</p>;
  }

  const images = JSON.parse(post.images || '[]');

  return (
    <div style={{ backgroundColor: 'rgba(27, 72, 136, 1)', minHeight: '100vh' }}>
      <Header />
      <div className={styles.postPage}>
        <div className={styles.postContainer}>
          <div className={styles.postContentBox}>
            <div className={styles.postInfoSection}>
              {isEditing ? (
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={styles.input}
                />
              ) : (
                <h1>{post.title}</h1>
              )}
              <div className={styles.postInfo}>
                {isEditing ? (
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className={styles.select}
                  >
                    {postCategories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p><strong>Category:</strong> {post.category}</p>
                )}

                {isEditing ? (
                  <input
                    type="datetime-local"
                    name="event_time"
                    value={formData.event_time}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                ) : (
                  <p><strong>Event Time:</strong> {new Date(post.event_time).toLocaleString()}</p>
                )}
                {isEditing ? (
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    className={styles.textarea}
                  />
                ) : (
                  <p><strong>Content:</strong> {post.content}</p>
                )}
              </div>

            {/* Like Section */}
            <div className={styles.likeSection}>
              <button onClick={handleLike} className={styles.likeButton}>
                {liked ? 'Unlike' : 'Like'}
              </button>
              <p>{likes} {likes === 1 ? 'Like' : 'Likes'}</p>
            </div>
              {/* Edit and Delete Buttons */}
              {user && user.id === post.user_id && (
                <div className={styles.actions}>
                  <button onClick={handleEditToggle} className={styles.editButton}>
                    {isEditing ? 'Cancel' : 'Edit'}
                  </button>
                  {isEditing && (
                    <button onClick={handleSave} className={styles.saveButton}>
                      Save
                    </button>
                  )}
                  <button onClick={handleDelete} className={styles.deleteButton}>
                    Delete
                  </button>
                </div>
              )}
            </div>

            <div className={styles.imageCarousel}>
              {images.length > 0 ? (
                <div className={styles.imageSection}>
                  <span
                    className={`${styles.arrow} ${styles.leftArrow}`}
                    onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                  >
                    &#8592;
                  </span>
                  <img
                    src={images[currentImageIndex]}
                    alt={`Post Image ${currentImageIndex + 1}`}
                    className={styles.postImage}
                  />
                  <span
                    className={`${styles.arrow} ${styles.rightArrow}`}
                    onClick={() => setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                  >
                    &#8594;
                  </span>
                </div>
              ) : (
                <p>No images available</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
