'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './Header.module.css';

export default function Header() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Link href="/">
          <img src="/images/logo.png" alt="Garazu Gidas Logo" className={styles.logo} />
        </Link>
      </div>
      <nav className={styles.nav}>
        {user ? (
          <>
            <Link href="/profile">Mano Profilis</Link>

            {user.role === 'admin' && (
              <Link href="/admin-dashboard">Admin</Link>
            )}
            {user.role === 'renter' && (
              <Link href="/create-garage">Garažų kūrimas</Link>
            )}

            <button className={styles.logoutButton} onClick={handleLogout}>
              Atsijungti
            </button>
          </>
        ) : (
          <>
            <Link href="/login">Prisijungti</Link>
            <Link href="/register">Registruotis</Link>
          </>
        )}
      </nav>
    </header>
  );
}
