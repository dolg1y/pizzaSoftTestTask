import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../../../store/slices/taskList';
import { AppDispatch, RootState } from '../../../store/store';
import FlexGrid from '../../layout/Grid';
import ObjectivesItem from '../ObjectivesItem/ObjectivesItem';
import styles from './ObjectivesList.module.scss';
import dayjs from 'dayjs';
import { Typography } from '@mui/material';

interface ObjectivesListProps {
  tasksPerRow: number;
  employeeFilter: string[];
  statusObjectivesFilter: string[];
  categoryFilter: string[];
}

const ObjectivesList: React.FC<ObjectivesListProps> = ({
  tasksPerRow,
  employeeFilter,
  statusObjectivesFilter,
  categoryFilter,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (loading) {
    return (
      <Typography fontWeight={600} fontSize={48}>
        Загрузка задач
      </Typography>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <Typography fontWeight={600} fontSize={48}>
        Задачи не найдены
      </Typography>
    );
  }

  const filteredTasks = tasks.filter((task) => {
    return (
      (employeeFilter.length === 0 ||
        employeeFilter.includes(task.taskAssigneeName)) &&
      (statusObjectivesFilter.length === 0 ||
        statusObjectivesFilter.includes(task.taskPriority)) &&
      (categoryFilter.length === 0 ||
        categoryFilter.includes(task.taskCategory))
    );
  });

  const sortedTasks = filteredTasks.sort((a, b) => {
    const dateA = a.taskRangeDateStart ? dayjs(a.taskRangeDateStart.iso) : null;
    const dateB = b.taskRangeDateStart ? dayjs(b.taskRangeDateStart.iso) : null;
    if (dateA && dateB) {
      return dateA.isBefore(dateB) ? -1 : 1;
    }
    return 0;
  });

  return (
    <FlexGrid
      className={styles.ObjectiveListContainer}
      style={{ gridTemplateColumns: `repeat(${tasksPerRow}, 1fr)` }}
    >
      {sortedTasks.map((task) => (
        <ObjectivesItem key={task.objectId} task={task} />
      ))}
    </FlexGrid>
  );
};

export default ObjectivesList;
