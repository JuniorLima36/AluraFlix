import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import Logo from '../../assets/Logo.png';

export default function Header() {
  return (
    <header className={styles.header}>
      <img src={Logo} alt="logo" />
      <section className={styles.buttons}>
        <Link to="/">
          <button type="button">Home</button>
        </Link>
        <Link to="/novo-video">
          <button type="button">Novo Vídeo</button>
        </Link>
      </section>
    </header>
  );
}


