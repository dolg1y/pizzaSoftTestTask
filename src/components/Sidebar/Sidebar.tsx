import React from 'react';
import { NavLink } from 'react-router-dom';
import { List, ListItemButton, ListItemIcon } from '@mui/material';
import {
  IconNavCalendar,
  IconNavGarage,
  IconNavShopping,
  MainPageIcon,
  TaskPageIcon,
} from '../../assets/svg/index';
import SettingsIcon from '@mui/icons-material/Settings';
import styles from './Sidebar.module.scss';
import { MenuItem } from '../../models/types';

const menuItems: MenuItem[] = [
  { path: '/', icon: <MainPageIcon width={20} height={20} /> },
  { path: '/task', icon: <TaskPageIcon width={20} height={20} /> },
  { path: '/calendar', icon: <IconNavCalendar width={20} height={20} /> },
  { path: '/shopping', icon: <IconNavShopping width={20} height={20} /> },
  { path: '/shopping', icon: <IconNavShopping width={20} height={20} /> },
  { path: '/garage', icon: <IconNavGarage width={20} height={20} /> },
  { path: '/settings', icon: <SettingsIcon /> },
];

const Sidebar: React.FC = () => {
  return (
    <aside
      style={{
        background: 'var(--main-color-background)',
        marginLeft: '20px',
        width: 'max-content',
        borderRadius: '34px',
        padding: '16px',
      }}
    >
      <List>
        {menuItems.map((item, index) => (
          <ListItemButton
            key={index}
            component={NavLink}
            to={item.path}
            classes={({ isActive }: { isActive: boolean }) =>
              `${styles.SidebarItem} ${isActive ? styles.active : ''}`.trim()
            }
            sx={{
              '&.active': { background: 'var(--color-green-hover) !important' },
            }}
          >
            <ListItemIcon className={styles.routerIcon}>
              {item.icon}
            </ListItemIcon>
          </ListItemButton>
        ))}
      </List>
    </aside>
  );
};

export default Sidebar;
