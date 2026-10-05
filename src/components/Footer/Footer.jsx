import React from 'react';
import styles from './Footer.module.css';

const Footer = React.memo(function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        Проект выполнен в рамках стажировки
        <a href='https://preax.ru' target='_blank' rel='noopener noreferrer'>
          PREAX
        </a>
      </p>
    </footer>
  );
});

export default Footer;
