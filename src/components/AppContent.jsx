import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';
import styles from '../styles/modules/app.module.scss';
import { getClasses } from '../utils/getClasses';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};
const child = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const AppContent = () => {
  const { todoList, filterStatus } = useSelector((store) => store.todo);
  const { isDark } = useSelector((store) => store.siteMood);

  // const sortedTodoList = [...todoList];
  // sortedTodoList.sort((a, b) => new Date(b.time) - new Date(a.time));

  const filteredTodoList = todoList.filter((item) => {
    if (filterStatus === 'all') {
      return true;
    }
    return item.status === filterStatus;
  });

  return (
    <motion.div
      className={
        getClasses([
          styles.content__wrapper, isDark && [styles['content__wrapper__dark']]
        ])
      }
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {filteredTodoList.length ? (
        filteredTodoList.map((todoItem) => (
          <TodoItem key={todoItem.id} todoItem={todoItem} />
        ))
      ) : (
        <motion.div
          className={styles.emptyText}
          variants={child}
        >
          no tasks added !
        </motion.div>
      )}
    </motion.div>
  );
};

export default AppContent;
