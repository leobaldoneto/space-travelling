import styles from './header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <img src="/images/logo.svg" alt="logo" />
    </header>
  );
}
