import { useMemo } from 'react';
import PropTypes from 'prop-types';
import styles from './Banner.module.css';
import LogoBanner from '../../assets/banner-screen.png';

const generateThumbnailUrl = (url) => {
  if (!url) return LogoBanner;

  const videoId = url.split('v=')[1];
  if (!videoId) return LogoBanner;

  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

Banner.propTypes = {
  selectedVideo: PropTypes.object,
  categorias: PropTypes.array.isRequired,
};

export default function Banner({ selectedVideo, categorias }) {
  const categoria = useMemo(() => {
    return categorias.find((categoria) => categoria.id === selectedVideo?.categoryId);
  }, [categorias, selectedVideo]);

  const { title, description, url, image } = selectedVideo || {};

  const videoImage = image || generateThumbnailUrl(url);

  return (
    <section
      className={styles.banner}
      style={{ backgroundImage: `url(${videoImage})` }}
    >
      {selectedVideo ? (
        <section className={styles.card}>
          <section className={styles.cardText}>
            <h1 style={{ backgroundColor: categoria?.color }}>
              {categoria ? categoria.title : 'Categoria não encontrada'}
            </h1>
            <h2>{title}</h2>
            <p>{description || 'Descrição não disponível'}</p>
          </section>
          <aside className={styles.image}>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${url.split('v=')[1]}`}
              style={{
                borderColor: categoria?.color,
                boxShadow: `0px 0px 27px 8px ${categoria?.shadowColor}`,
              }}
              className="iframe-style"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={title}
            ></iframe>
          </aside>
        </section>
      ) : (
        <section className={styles.prevCard}>
          <section className={styles.prevCardText}>
            <h1>Bem-vindo(a) ao</h1>
            <h2>ALURAFLIX 🚀</h2>
            <p>
              Aqui você encontra os melhores vídeos sobre programação Front-End,
              Back-End e Mobile. Aprenda, evolua e descubra conteúdos incríveis
              para transformar suas ideias em código. Explore agora e dê o próximo
              passo na sua jornada como dev!👨‍💻
            </p>
          </section>
          <aside className={styles.prevImage}>
            <img src={LogoBanner} alt="Logo do AluraFlix" />
          </aside>
        </section>
      )}
    </section>
  );
}
