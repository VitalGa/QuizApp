import styles from './Logo.module.css';
import logo from '@/assets/images/logo/logo.svg';

function Logo() {
  return (
    <div className={styles.wrapper}>
      <img src={logo} alt='Quiz Logo' className={styles.image} />
    </div>
  );
}

export default Logo;
