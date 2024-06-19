import styles from '../styles/modules/title.module.scss';
import { getClasses } from '../utils/getClasses';
import { useSelector } from 'react-redux';

const PageTitle = ({ children }) => {
  const { isDark } = useSelector((store) => store.siteMood);

  return (
    <p className={getClasses([styles.title, isDark && [styles.title__dark]])}>
      {children}
    </p>
  );
};

export default PageTitle;
