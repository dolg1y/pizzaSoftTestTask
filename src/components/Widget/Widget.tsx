import React, { useState } from 'react';
import FlexGrid from '../layout/Grid';
import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { ReactComponent as ProfileIcon } from '../../assets/svg/IconProfile.svg';

import styles from './Widget.module.scss';
import {
  IconExitModal,
  IconProfileModal,
  IconSettingModal,
} from '../../assets/svg';

const WidgetItem: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <FlexGrid className={styles.ProfileIcon} padding={0}>
      <FlexGrid direction="column">
        <Typography color="var(--color-text-primary)" fontSize={16}>
          Иван Иванов
        </Typography>
        <Typography color="var(--color-text-second)" fontSize={14}>
          Должность
        </Typography>
      </FlexGrid>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        color="inherit"
      >
        <ProfileIcon></ProfileIcon>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{
          borderRadius: '20px',
        }}
      >
        <MenuItem
          sx={{
            color: 'var(--color-text-primary)',
            gap: '8px',
          }}
          onClick={handleClose}
        >
          <IconProfileModal></IconProfileModal>
          Профиль
        </MenuItem>
        <MenuItem
          sx={{
            color: 'var(--color-text-primary)',
            gap: '8px',
          }}
          onClick={handleClose}
        >
          <IconSettingModal></IconSettingModal>
          Настройки
        </MenuItem>
        <MenuItem
          sx={{
            color: 'var(--color-text-red)',
            gap: '8px',
          }}
          onClick={handleClose}
        >
          <IconExitModal></IconExitModal>
          Выход
        </MenuItem>
      </Menu>
    </FlexGrid>
  );
};

export default WidgetItem;
