import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/" className={styles.logoLink}>
          <Image 
            src="/sucai/earth.png"
            alt="World Geography Games"
            width={50}
            height={50}
            className={styles.logoImage}
          />
          <span className={styles.logoText}>World Geography Games</span>
        </Link>
      </div>
      <div className={styles.navLinks}>
        <Link href="/english" className={styles.navLink}>英语</Link>
        <Link href="/spanish" className={styles.navLink}>西班牙语</Link>
        <Link href="/german" className={styles.navLink}>德语</Link>
        <Link href="/french" className={styles.navLink}>法语</Link>
        <Link href="/arabic" className={styles.navLink}>العربية</Link>
        <Link href="/russian" className={styles.navLink}>俄罗斯语</Link>
        <Link href="/chinese" className={styles.navLink}>简中</Link>
        <Link href="/traditional" className={styles.navLink}>繁中</Link>
      </div>
    </nav>
  );
};

export default Navbar; 