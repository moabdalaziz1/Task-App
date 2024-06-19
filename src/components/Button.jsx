import styles from '../styles/modules/button.module.scss';
import { getClasses } from '../utils/getClasses';
import { useSelector } from 'react-redux';

const Button = ({ children, variant, type, ...rest }) => {
  return (
    <button
      type={type}
      className={getClasses([styles.button, styles[`button--${variant}`]])}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;

export const SelectButton = ({ children, ...rest }) => {
  const { isDark } = useSelector((store) => store.siteMood);

  return (
    <select
      className={getClasses([
        styles.button,
        styles['button--select'],
        isDark && styles['button--select__dark'],
      ])}
      {...rest}
    >
      {children}
    </select>
  );
};
