'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from '../login/LoginRegister.module.css';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data));
        router.push('/');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div>
      <Header />

      <div className={styles.formContainer}>
        <div className={styles.formCard}>
          <h1 className={styles.formHeading}>Create an Account</h1>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formInput}>
              <span className={styles.formInputIcon}>
                <i className="fa fa-user"></i>
              </span>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
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

            <button type="submit" className={styles.formButton}>
              Register
            </button>
          </form>

          {message && <p className={styles.errorMessage}>{message}</p>}

          <p className={styles.centeredText}>
            Already have an account?{' '}
            <a href="/login" className={styles.formLink}>
              Log in here
            </a>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
