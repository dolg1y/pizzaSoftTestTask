import React from 'react';
import Grid from '../layout/Grid';
import { ReactComponent as ActiveUserIcon } from '../../assets/svg/activeUser/activeUserIcon.svg';
import styles from './UserActive.module.scss';
import { Typography } from '@mui/material';

const UserIsOnline = {
  user: '15',
};

const UserActive: React.FC = () => {
  return (
    <Grid gap={12} className={styles.UserActive} direction="row">
      <ActiveUserIcon />
      <Grid direction="column">
        <Typography fontSize={12} color="var(--gray-color)">
          Активных пользователей
        </Typography>
        <Typography fontSize={18} fontWeight={600}>
          {UserIsOnline.user}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default UserActive;
