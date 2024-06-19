import { useState, useEffect } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import styles from '../styles/modules/todoItem.module.scss';
import { getClasses } from '../utils/getClasses';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodo, updateTodo } from '../features/todoSlice';
import toast from 'react-hot-toast';
import TodoModal from './TodoModal';
import CheckBox from './CheckBox';
import { motion } from 'framer-motion';

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const TodoItem = ({ todoItem }) => {
  const dispatch = useDispatch();
  const { isDark } = useSelector((store) => store.siteMood);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (todoItem.status === 'complete') {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [todoItem.status]);

  const deleteClickedTask = () => {
    dispatch(deleteTodo(todoItem.id));
    toast('Task Deleted Successfully ✔️👍🏿');
  };
  const updateClickedTask = () => {
    setOpenModalUpdate(true);
  };
  const handleCheck = () => {
    setChecked(!checked);
    dispatch(
      updateTodo({
        ...todoItem,
        status: checked ? 'incomplete' : 'complete',
      })
    );
    !checked
      ? toast('Great, You Have Completed A Task 👏🏼', {
          duration: 2000,
        })
      : null;
  };

  return (
    <motion.div
      className={getClasses([styles.item, isDark && styles.item__dark])}
      variants={child}
    >
      <div className={styles.todoDetails}>
        {/* Checkbox goes here */}
        <CheckBox checked={checked} handleCheck={handleCheck} />
        <div className={styles.texts}>
          <p
            className={getClasses([
              styles.todoText,
              todoItem.status === 'complete' && styles['todoText--completed'],
            ])}
          >
            {todoItem.task}
          </p>
          <p className={styles.time}>
            {format(new Date(todoItem.time), 'E, dd/MM/yyyy, hh:mm a')}
          </p>
        </div>
      </div>

      <div className={styles.todoActions}>
        <div className={styles.icon} onClick={deleteClickedTask}>
          <MdDelete />
        </div>
        <div className={styles.icon} onClick={updateClickedTask}>
          <MdEdit />
        </div>
      </div>
      <TodoModal
        type="update"
        todoItem={todoItem}
        openModal={openModalUpdate}
        setOpenModal={setOpenModalUpdate}
      />
    </motion.div>
  );
};

export default TodoItem;
