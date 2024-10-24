import styles from './Footer.module.css';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <table className={styles.footer}>
        <tr>
          © 2024 Garažų Gidas.
        </tr>
        <tr className={styles.footerLink}>
          <Link href="/login">Prisijungti </Link> 
          <Link href="/register"> Registruotis</Link>
          <Link href="/titulinis">titulinis</Link>
        </tr>
      </table>
    </footer>
  );
}
