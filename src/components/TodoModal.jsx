import { useEffect, useState } from 'react';
import { MdOutlineClose } from 'react-icons/md';
import styles from '../styles/modules/modal.module.scss';
import Button from './Button';
import { useDispatch, useSelector } from 'react-redux';
import { getClasses } from '../utils/getClasses';
import { addTodo, updateTodo } from '../features/todoSlice';
import { v4 as uuid } from 'uuid';
import toast from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';

const dropIn = {
  hidden: {
    opacity: 0,
    transform: 'scale(0.9)',
  },
  visible: {
    transform: 'scale(1)',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    transform: 'scale(0.9)',
    opacity: 0,
  },
};

const TodoModal = ({ type, openModal, setOpenModal, todoItem }) => {
  const dispatch = useDispatch();
  const { isDark } = useSelector((store) => store.siteMood);
  const closeModal = () => {
    setOpenModal(false);
  };
  // Control The Form Values Dynamically.
  const [modalFormData, setModalFormData] = useState({
    task: '',
    status: 'incomplete',
  });
  // Change The Form Fields Values Dynamically.
  const handleChange = ({ target: { value, name } }) => {
    setModalFormData({
      ...modalFormData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (type === 'update' && todoItem) {
      setModalFormData({
        ...modalFormData,
        task: todoItem.task,
        status: todoItem.status,
      });
    } else {
      setModalFormData({
        ...modalFormData,
        task: '',
        status: 'incomplete',
      });
    }
  }, [type, todoItem, openModal]);

  // Apply The Needed Logic When Submitting The Modal Form.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalFormData.task === '') {
      toast('Bro, Fill The Task Field 🗿☠️', {
        position: 'top-center',
      });
    }
    if (modalFormData.task && modalFormData.status) {
      if (type === 'add') {
        dispatch(
          addTodo({
            id: uuid(),
            ...modalFormData,
            time: new Date().toLocaleString('en-US'),
          })
        );
        setModalFormData({
          task: '',
          status: 'incomplete',
        });
        closeModal();
        toast('Task Added Successfully 📝✔️');
      }
      if (type === 'update') {
        if (
          todoItem.task !== modalFormData.task ||
          todoItem.status !== modalFormData.status
        ) {
          dispatch(
            updateTodo({
              ...todoItem,
              task: modalFormData.task,
              status: modalFormData.status,
            })
          );
          toast('Task Updated Successfully ⚙️✔️');
          closeModal();
        } else {
          toast('NO UPDATES MADE 🚨❌');
        }
      }
    }
  };

  return (
    <AnimatePresence>
      {openModal && (
        <motion.div
          className={styles.wrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={getClasses([
              styles.container,
              isDark && styles.container__dark,
            ])}
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className={styles.closeButton}
              onClick={closeModal}
              initial={{ top: 40, opacity: 0 }}
              animate={{ top: -10, opacity: 1 }}
              exit={{ top: 40, opacity: 0 }}
            >
              <MdOutlineClose />
            </motion.div>
            <form className={styles.form} onSubmit={handleSubmit}>
              <h1 className={styles.formTitle}>
                {type === 'update' ? 'update' : 'add'} task
              </h1>
              <label htmlFor="task">
                task
                <input
                  type="text"
                  name="task"
                  id="task"
                  value={modalFormData.task}
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="taskStatus">
                task status
                <select
                  name="status"
                  id="taskStatus"
                  value={modalFormData.status}
                  onChange={handleChange}
                  style={{ textTransform: 'capitalize' }}
                >
                  <option value="incomplete">incomplete</option>
                  <option value="complete">complete</option>
                </select>
              </label>
              <div className={styles.buttonContainer}>
                <Button type="submit" variant="primary">
                  {type === 'update' ? 'update' : 'add'} task
                </Button>
                <Button type="button" variant="secondary" onClick={closeModal}>
                  cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TodoModal;
