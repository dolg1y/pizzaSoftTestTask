import React, { useState } from 'react';
import { Badge, IconButton } from '@mui/material';
import FlexGrid from '../layout/Grid';

import styles from './ChatItem.module.scss';
import { IconChat } from '../../assets/svg';

const ChatItem: React.FC = () => {
  return (
    <FlexGrid padding={0}>
      <IconButton>
        <Badge badgeContent={'9+'} color="secondary">
          <FlexGrid className={styles.Chat}>
            <IconChat />
          </FlexGrid>
        </Badge>
      </IconButton>
    </FlexGrid>
  );
};

export default ChatItem;
