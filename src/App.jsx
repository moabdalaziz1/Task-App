import { Toaster } from 'react-hot-toast';
import './App.css';
import AppContent from './components/AppContent';
import AppHeader from './components/AppHeader';
import PageTitle from './components/PageTitle';
import styles from './styles/modules/app.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSiteMood } from './features/darkLightSilce';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { getClasses } from './utils/getClasses';

function App() {
  const { isDark } = useSelector((store) => store.siteMood);
  const { todoList } = useSelector((store) => store.todo);

  const incompleteLists = todoList.filter((todo) => {
    return todo.status === 'incomplete';
  });

  const dispatch = useDispatch();
  const switchMood = () => {
    dispatch(toggleSiteMood(!isDark));
  };

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            textTransform: 'capitalize',
            fontSize: '16px',
            boxShadow:
              'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
          },
        }}
      />
      <div className={`container ${isDark ? 'dark' : 'light'}`}>
        {/* The Light&Dark Button And My Name */}
        <div className={styles.app__header}>
          <div
            className={getClasses([
              styles.devName,
              isDark && styles.devName__dark,
            ])}
          >
            developed by <a href="https://moabdalaziz1.github.io/">ZIZU</a>
          </div>

          <div
            className={getClasses([
              styles.darkLight,
              isDark ? [styles.light] : [styles.dark],
            ])}
            onClick={switchMood}
          >
            {isDark ? <MdLightMode /> : <MdDarkMode />}
          </div>
        </div>
        {/* Showing The Number Of Tasks */}
        <div
          className={getClasses([
            styles.numOfTasks,
            isDark && styles.numOfTasks__dark,
          ])}
        >
          you have <span>{incompleteLists.length}</span>{' '}
          {todoList.length === 1 ? 'task' : 'tasks'} to complete
        </div>
        <PageTitle>{`what are you going to achieve today?`} 🤔</PageTitle>
        <div className={styles.app__wrapper}>
          <AppHeader />
          <AppContent />
        </div>
      </div>
    </>
  );
}

export default App;
