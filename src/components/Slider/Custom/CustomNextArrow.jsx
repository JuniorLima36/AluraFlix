import PropTypes from 'prop-types';
import styles from '../Slider.module.css';

CustomNextArrow.propTypes = {
  onClick: PropTypes.func,
  color: PropTypes.string,
};

export default function CustomNextArrow({ onClick, color }) {
  return (
    <div
      className={`${styles.arrow} ${styles.arrowNext}`}
      style={{
        position: 'absolute',
        right: '-35px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 10,
        cursor: 'pointer',
        color: color,
        fontSize: '30px',
      }}
      onClick={onClick}
    >
      ▶
    </div>
  );
}
