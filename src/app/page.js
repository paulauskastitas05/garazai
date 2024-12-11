'use client';

import { useState, useEffect } from 'react';
import Select from 'react-select';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { postCategories } from '../data/postCategories';
import Link from 'next/link';
import styles from './Home.module.css';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [sortOrder, setSortOrder] = useState(null); // Sorting order

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        const data = await response.json();
        setPosts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error loading posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const openImage = (img) => setSelectedImage(img);
  const closeModal = () => setSelectedImage(null);

  // Filter and sort posts
  const filteredAndSortedPosts = posts
  .filter((post) => {
    return selectedCategory ? post.category === selectedCategory.value : true;
  })
  .sort((a, b) => {
    if (sortOrder === 'asc') return a.likes - b.likes;
    if (sortOrder === 'desc') return b.likes - a.likes;
    return 0;
  });

  return (
    <div>
      <Header />

      <div className={styles.container}>
        <div className={styles.filterCard}>
          <div className={styles.filterItem}>
            <label>Filter by Category</label>
            <Select
              options={postCategories}
              onChange={setSelectedCategory}
              placeholder="Select a category"
              isClearable
              value={selectedCategory}
              styles={{
                control: (provided) => ({
                  ...provided,
                  backgroundColor: 'white',
                  borderColor: '#ccc',
                  color: 'black',
                }),
                singleValue: (provided) => ({
                  ...provided,
                  color: 'black',
                }),
                placeholder: (provided) => ({
                  ...provided,
                  color: 'black',
                }),
                menu: (provided) => ({
                  ...provided,
                  backgroundColor: 'white',
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isFocused ? '#e5e5e5' : 'white',
                  color: 'black',
                  cursor: 'pointer',
                }),
              }}
            />
          </div>

          <div className={styles.sortButtonContainer}>
  <button
    className={styles.sortButton}
    onClick={() =>
      setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'))
    }
    aria-label={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
  >
    {sortOrder === 'asc' ? '↓' : '↑'}
  </button>
</div>


        </div>

        <div className={styles.postList}>
          {filteredAndSortedPosts.map((post) => {
            const images = JSON.parse(post.images || '[]');
            const mainImage = images[0];
            const stackedImages = images.slice(1, 4);

            return (
              <div key={post.id} className={styles.postItem}>
                <div className={styles.imageSection}>
                  <img
                    src={mainImage}
                    alt={post.title}
                    className={styles.mainImage}
                    onClick={() => openImage(mainImage)}
                  />
                  <div className={styles.stackedImages}>
                    {stackedImages.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`Post Image ${index + 1}`}
                        className={styles.stackedImage}
                        onClick={() => openImage(img)}
                      />
                    ))}
                  </div>
                </div>

                <div className={styles.postInfo}>
                  <Link href={`/posts/${post.id}`}>
                    <h3 className={styles.postName} style={{ cursor: 'pointer' }}>
                      {post.title}
                    </h3>
                  </Link>
                  <p>{post.category}</p>
                  <p>{new Date(post.event_time).toLocaleString()}</p>
                  <p>{post.likes} {post.likes === 1 ? 'Like' : 'Likes'}</p>
                </div>
              </div>
            );
          })}
        </div>

        {selectedImage && (
          <div className={styles.modal} onClick={closeModal}>
            <img src={selectedImage} alt="Enlarged" className={styles.modalImage} />
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
