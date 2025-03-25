import React, { useState } from 'react';
import {
  Badge,
  IconButton,
  Paper,
  Snackbar,
  SnackbarCloseReason,
  Typography,
} from '@mui/material';
import { ReactComponent as NotificationsIcon } from '../../assets/svg/NotificationItem.svg';
import FlexGrid from '../layout/Grid';

import styles from './NotificationItem.module.scss';

const NotificationItem: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <FlexGrid padding={0}>
      <FlexGrid padding={0}>
        <IconButton onClick={handleClick}>
          <Badge badgeContent={'9+'} color="error">
            <FlexGrid className={styles.Notification}>
              <NotificationsIcon />
            </FlexGrid>
          </Badge>
        </IconButton>
        <Snackbar
          autoHideDuration={6000}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={open}
          onClose={handleClose}
        >
          <Paper>
            <FlexGrid className={styles.NotificationWrapper}>
              <FlexGrid className={styles.NotificationWrapper__header}>
                <Typography fontSize={24} color="var(--color-text-primary)">
                  Уведомления
                </Typography>
                <Typography fontSize={14} color="var(--color-text-third)">
                  Настройки
                </Typography>
              </FlexGrid>
              <FlexGrid className={styles.NotificationWrapper__body}>
                <Typography
                  textAlign={'center'}
                  fontSize={16}
                  color="var(--color-text-second)"
                >
                  Нет уведомлений
                </Typography>
              </FlexGrid>
            </FlexGrid>
          </Paper>
        </Snackbar>
      </FlexGrid>
    </FlexGrid>
  );
};

export default NotificationItem;
