import PropTypes from 'prop-types';
import styles from '../Slider.module.css';

CustomPrevArrow.propTypes = {
  onClick: PropTypes.func,
  color: PropTypes.string,
};

export default function CustomPrevArrow({ onClick, color }) {
  return (
    <div
      className={`${styles.arrow} ${styles.arrowPrev}`}
      style={{
        position: 'absolute',
        left: '-40px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 10,
        cursor: 'pointer',
        color: color,
        fontSize: '30px',
      }}
      onClick={onClick}
    >
      ◀
    </div>
  );
}
