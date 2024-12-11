'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from '../login/LoginRegister.module.css';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data)); // Store user data in localStorage
        router.push('/'); // Redirect to the homepage
      } else {
        setMessage(data.message); // Display error message
      }
    } catch (error) {
      setMessage('Error: ' + error.message); // Handle any errors
    }
  };

  return (
    <div>
      <Header />

      <div className={styles.formContainer}>
        <div className={styles.formCard}>
          <h1 className={styles.formHeading}>Log in to your account</h1>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formInput}>
              <span className={styles.formInputIcon}>
                <i className="fa fa-envelope"></i>
              </span>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formInput}>
              <span className={styles.formInputIcon}>
                <i className="fa fa-lock"></i>
              </span>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.rememberMeSection}>
              <label>
                <input type="checkbox" /> Remember me
              </label>
            </div>

            <button type="submit" className={styles.formButton}>
              Log In
            </button>
          </form>

          {message && <p className={styles.errorMessage}>{message}</p>}

          <p className={styles.centeredText}>
            Don’t have an account?{' '}
            <a href="/register" className={styles.formLink}>
              Register here
            </a>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
