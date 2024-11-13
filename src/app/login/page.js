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
          <h1 className={styles.formHeading}>Prisijungti prie paskyros</h1>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formInput}>
              <span className={styles.formInputIcon}>
                <i className="fa fa-envelope"></i>
              </span>
              <input
                type="email"
                name="email"
                placeholder="Įveskite savo email"
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
                placeholder="Įveskite savo slaptažodį"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.rememberMeSection}>
              <label>
                <input type="checkbox" /> Prisiminti mane
              </label>
            </div>

            <button type="submit" className={styles.formButton}>
              Prisijungti
            </button>
          </form>

          {message && <p className={styles.errorMessage}>{message}</p>}

          <p className={styles.centeredText}>
            Neturi paskyros?{' '}
            <a href="/register" className={styles.formLink}>
              Registruotis čia
            </a>
          </p>
        </div>
      </div>

      <Footer /> 
    </div>
  );
}
