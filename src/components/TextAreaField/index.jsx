import PropTypes from 'prop-types';
import styles from './TextAreaField.module.css';

export default function TextAreaField({ label, id, value, onChange, placeholder, className }) {
  return (
    <div className={`${styles.textAreaField} ${className}`}>
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows="10"
        cols="30"
      ></textarea>
    </div>
  );
}

TextAreaField.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  className: PropTypes.string,
};
