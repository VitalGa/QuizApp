import Logo from '@/components/UI/Logo/Logo';
import styles from './Header.module.css';

function Header({ currentPage, onReturnToStart }) {
  const handleLogoClick = (event) => {
    event.preventDefault();
    if (currentPage !== 'start' && onReturnToStart) {
      onReturnToStart();
    }
  };

  if (currentPage === 'start') {
    return (
      <header className={styles.header}>
        <Logo alt='Quiz Logo' />
      </header>
    );
  }

  return (
    <header className={styles.header}>
      <a href='/' className={styles.logoLink} onClick={handleLogoClick}>
        <Logo className={styles.logo} alt='Quiz Logo' />
        <span className='visually-hidden'>Вернуться на стартовую страницу</span>
      </a>
    </header>
  );
}

export default Header;
