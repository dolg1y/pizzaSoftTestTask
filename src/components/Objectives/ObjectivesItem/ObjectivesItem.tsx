import * as React from 'react';
import FlexGrid from '../../layout/Grid';
import styles from './ObjectivesItem.module.scss';
import { IconButton, Typography } from '@mui/material';
import {
  IconObjectivesAvaLorem,
  IconObjectivesDate,
  IconObjectivesLink,
} from '../../../assets/svg';
import { Task } from '../../../models/types';
import dayjs from 'dayjs';
import _ from 'lodash';

interface ObjectivesItemProps {
  task: Task;
}

const ObjectivesItem: React.FC<ObjectivesItemProps> = ({ task }) => {
  const priorityMap: { [key: string]: { className: string; text: string } } = {
    Важно: { className: styles.ObjectivesRed, text: 'Высокий' },
    'В процессе': { className: styles.ObjectivesBlue, text: 'В процессе' },
    Выполненная: { className: styles.ObjectivesGreen, text: 'Выполненная' },
    Срочная: { className: styles.ObjectivesRed, text: 'Срочная' },
    Важная: { className: styles.ObjectivesOrange, text: 'Важная' },
    'Новая задача': {
      className: styles.ObjectivesBlue,
      text: 'Новая задача',
    },
  };

  const { className } = priorityMap[task.taskPriority] || {
    className: styles.Objectives,
    text: task.taskPriority,
  };

  const formatName = (fullName: string) => {
    const nameParts = _.split(fullName, ' ');
    const lastName = nameParts[0];
    const initials = nameParts
      .slice(1)
      .map((name) => `${name[0]}.`)
      .join(' ');
    return `${lastName} ${initials}`;
  };

  return (
    <FlexGrid className={`${styles.Objectives} ${className}`}>
      <FlexGrid className={styles.ObjectivesTitle}>
        <Typography>
          {task.taskId} • {task.taskCategory}
        </Typography>
        <FlexGrid className={styles.Priority}>
          <Typography>{task.taskPriority}</Typography>
        </FlexGrid>
      </FlexGrid>

      <FlexGrid className={styles.ObjectivesBody}>
        <Typography fontWeight={600}>{task.taskTitle}</Typography>
        <FlexGrid className={styles.DateRange}>
          <IconObjectivesDate />
          <Typography color="#FFFFFF99">
            {task.taskRangeDateStart
              ? dayjs(task.taskRangeDateStart.iso).format('DD.MM.YYYY')
              : 'Без даты'}
          </Typography>
          <Typography color="#FFFFFF99">-</Typography>
          <Typography color="#FFFFFF99">
            {task.taskRangeDateEnd
              ? dayjs(task.taskRangeDateEnd.iso).format('DD.MM.YYYY')
              : 'Без даты'}
          </Typography>
        </FlexGrid>
      </FlexGrid>

      <FlexGrid className={styles.ObjectiveFooter}>
        <FlexGrid gap={8} alignItems="center">
          {task.assigneePhoto ? (
            <img
              src={task.assigneePhoto.url}
              alt={task.taskAssigneeName}
              className={styles.AssigneePhoto}
            />
          ) : (
            <IconObjectivesAvaLorem />
          )}
          <Typography>{formatName(task.taskAssigneeName)}</Typography>
        </FlexGrid>
        <IconButton>
          <IconObjectivesLink />
        </IconButton>
      </FlexGrid>
    </FlexGrid>
  );
};

export default ObjectivesItem;
