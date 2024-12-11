'use client';

import { useState, useEffect } from 'react';
import Select from 'react-select';
import { useRouter } from 'next/navigation';
import { postCategories } from '../../data/postCategories'; // Import post categories
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from './CreatePost.module.css';

export default function CreatePost() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    images: [],
    event_time: '',
  });
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserId(user.id);
    } else {
      router.push('/login'); // Redirect to login if user is not authenticated
    }
  }, [router]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryChange = (selectedOption) => {
    setFormData({ ...formData, category: selectedOption?.value || '' });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      images: files,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('title', formData.title);
    formDataToSubmit.append('content', formData.content);
    formDataToSubmit.append('category', formData.category);
    formDataToSubmit.append('event_time', formData.event_time);
    formDataToSubmit.append('userId', userId);
    formData.images.forEach((file, i) => {
      formDataToSubmit.append(`images_${i}`, file);
    });

    try {
      const response = await fetch('/api/create-post', {
        method: 'POST',
        body: formDataToSubmit,
      });

      if (response.ok) {
        setMessage('Post created successfully!');
        router.push('/'); // Redirect to home page after successful post creation
      } else {
        setMessage('Failed to create post.');
      }
    } catch (error) {
      console.error('Failed to create post:', error);
      setMessage('An error occurred while creating the post.');
    }
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <h1>Create a New Post</h1>
        {message && <p className={styles.message}>{message}</p>}
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Enter title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
          <input
          type="text"
            name="content"
            placeholder="Enter content"
            value={formData.content}
            onChange={handleInputChange}
            rows="5"
            required
          />
          <Select
            options={postCategories}
            onChange={handleCategoryChange}
            placeholder="Select a category"
            value={postCategories.find((cat) => cat.value === formData.category)}
            isClearable
          />
          <input
            type="datetime-local"
            name="event_time"
            value={formData.event_time}
            onChange={handleInputChange}
            required
          />
          <input
            type="file"
            name="images"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          <button type="submit">Create Post</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
