import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './Loading.module.css';

Loading.propTypes = {
  cardCount: PropTypes.number,
  skeletonCount: PropTypes.number,
};

export default function Loading({ cardCount = 3, skeletonCount = 4 }) {
  return (
    <section className={styles.loadingContainer}>
      {[...Array(cardCount)].map((_, index) => (
        <section className={styles.category} key={index}>
          <Skeleton height={40} width={200} style={{ marginBottom: '1rem' }} />
          <section className={styles.cardContainer}>
            {[...Array(skeletonCount)].map((_, i) => (
              <div key={i} className={styles.card}>
                <Skeleton height={150} width="100%" borderRadius="10px" />
                <Skeleton height={20} width="80%" style={{ margin: '0.5rem 0' }} />
              </div>
            ))}
          </section>
        </section>
      ))}
    </section>
  );
}
