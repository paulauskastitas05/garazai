"use client";  // This marks the component as a Client Component

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header'; 
import Footer from '../../components/Footer'; 
import styles from './Profile.module.css'; 

export default function Profile() {
  const [user, setUser] = useState(null);
  const [phone, setPhone] = useState('');
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setPhone(userData.phone || '');
    } else {
      router.push('/login');
    }
  }, [router]);

  const handlePhoneChange = (e) => {
    const onlyNumbers = e.target.value.replace(/\D/g, '');
    setPhone(onlyNumbers);
  };

  const handleSavePhone = async () => {
    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...user, phone }),
      });

      if (response.ok) {
        setUser((prevUser) => ({ ...prevUser, phone }));
        localStorage.setItem('user', JSON.stringify({ ...user, phone }));
        setIsEditingPhone(false);
      } else {
        console.error('Failed to update phone');
      }
    } catch (error) {
      console.error('Failed to update phone:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (!user) {
    return <p>Kraunama...</p>;
  }

  return (
    <div>
      <Header />
      <div className={styles.profileContainer}>
        <h1>Mano profilis</h1>
        <div className={styles.profileInfo}>
          <p><strong>Vardas:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Rolė:</strong> {user.role}</p>
          <p><strong>Telefono numeris:</strong> 
            {isEditingPhone ? (
              <>
                <input 
                  type="text" 
                  value={phone} 
                  onChange={handlePhoneChange} 
                  maxLength="12"
                  placeholder="Įveskite telefono numerį" 
                  className={styles.phoneInput}
                />
                <button onClick={handleSavePhone} className={styles.saveButton}>Išsaugoti</button>
              </>
            ) : (
              <>
                {phone || 'Nėra duomenų'}
                <button onClick={() => setIsEditingPhone(true)} className={styles.editButton}>Redaguoti</button>
              </>
            )}
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
