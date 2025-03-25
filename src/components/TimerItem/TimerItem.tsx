import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import FlexGrid from '../layout/Grid';

import styles from './TimerItem.module.scss';
import { IconTimer } from '../../assets/svg';

const TimerItem: React.FC = () => {
  return (
    <FlexGrid padding={0}>
      <IconButton>
        <FlexGrid className={styles.Timer}>
          <IconTimer />
        </FlexGrid>
      </IconButton>
    </FlexGrid>
  );
};

export default TimerItem;
