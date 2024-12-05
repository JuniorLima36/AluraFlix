import { useNavigate } from 'react-router-dom';
import styles from './ErrorPage.module.css';
import LogoBanner from '../../assets/hole.svg';

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div className={styles.bannerErrorPage}>
      <section className={styles.errorPageCard}>
          <aside className={styles.errorPageImage}>
            <img src={LogoBanner} alt="logo banner" />
          </aside>
          <section className={styles.errorPageCardText}>
            <h1>404 - Ops...</h1>
            <h2>
              A página que você requisitou não foi encontrada. <br/>
              Você não deveria estar aqui 👨‍💻
            </h2>
            <button onClick={() => navigate("/")}>Retorne à Home</button>
          </section>
        </section>
    </div>
  );
}


