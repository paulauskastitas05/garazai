'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './titulinis.module.css';

export default function titulinis() {
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
        <article className={styles.Karusele}>
            <Image
                src="https://duckduckgo.com/i/4550309a78e0a87f.jpg"
                width={500}
                height={500}
                alt="Picture of the author"
              />
        </article>
    )
};