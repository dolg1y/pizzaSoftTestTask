import React from 'react';

import styles from './Calendar.module.scss';

import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

import 'dayjs/locale/ru';

import FlexGrid from '../layout/Grid';
import { IconCalendar } from '../../assets/svg';
import { Typography } from '@mui/material';

const Calendar: React.FC = () => {
  return (
    <FlexGrid className={styles.Calendar}>
      <FlexGrid className={styles.Calendar__Header}>
        <FlexGrid gap={'12px'}>
          <IconCalendar />
          <FlexGrid direction="column" justifyContent="center">
            <Typography fontSize={'18px'} color="var(--color-text-primary)">
              Календарь
            </Typography>
            <Typography fontSize={'14px'} color="var(--color-text-second)">
              Категории
            </Typography>
          </FlexGrid>
        </FlexGrid>
      </FlexGrid>
      <DateCalendar showDaysOutsideCurrentMonth />
    </FlexGrid>
  );
};

export default Calendar;
