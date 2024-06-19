import { useState } from 'react';
import Button, { SelectButton } from './Button';
import styles from '../styles/modules/app.module.scss';
import TodoModal from './TodoModal';
import { useSelector, useDispatch } from 'react-redux';
import { updateFilterStatus } from '../features/todoSlice';

const AppHeader = () => {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const { filterStatus } = useSelector((store) => store.todo);

  const updateFilter = (e) => {
    dispatch(updateFilterStatus(e.target.value));
  };

  return (
    <div className={styles.appHeader}>
      <Button
        variant="primary"
        type="button"
        onClick={() => setOpenModal(true)}
      >
        add task
      </Button>
      <SelectButton value={filterStatus} onChange={updateFilter}>
        <option value="all">all</option>
        <option value="incomplete">incomplete</option>
        <option value="complete">complete</option>
      </SelectButton>
      <TodoModal type="add" openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
};

export default AppHeader;
