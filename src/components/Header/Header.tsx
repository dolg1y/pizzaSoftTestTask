import react from 'react';

import styles from './Header.module.scss';

import FlexGrid from '../layout/Grid';
import NotificationItem from '../Notification/NotificationItem';
import Widget from '../Widget/Widget';
import DateTime from '../DateAndTime/DateTime';

import { IconLogo } from '../../assets/svg/index';
import ChatItem from '../ChatItem/ChatItem';
import TimerItem from '../TimerItem/TimerItem';

const Header: React.FC = () => {
  return (
    <FlexGrid
      padding={'20px 30px'}
      justifyContent={'space-between'}
      alignItems={'center'}
      className={styles.header}
    >
      <IconLogo />
      <FlexGrid gap={'33px'} alignItems="center">
        <DateTime></DateTime>
        <FlexGrid gap={'10px'}>
          <TimerItem />
          <ChatItem />
          <NotificationItem />
        </FlexGrid>
        <Widget />
      </FlexGrid>
    </FlexGrid>
  );
};

export default Header;
