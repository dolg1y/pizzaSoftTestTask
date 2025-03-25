import React, { useEffect } from 'react';
import FlexGrid from '../layout/Grid';

import styles from './BreadCumbs.module.scss';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { MainPageBreadcumb } from '../../assets/svg';

interface PageProps {
  title: string;
}

const BreadCumb: React.FC<PageProps> = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <FlexGrid className={styles.BreadCumb}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          className={styles.BreadCumb__link}
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          href="/"
        >
          <MainPageBreadcumb fontSize="inherit" />
          <Typography
            fontWeight={600}
            fontSize={12}
            color="var(--color-text-second)"
          >
            Главная страница
          </Typography>
        </Link>
      </Breadcrumbs>
      <Typography
        fontWeight={600}
        fontSize={48}
        color="var(--color-text-primary)"
      >
        {title}
      </Typography>
    </FlexGrid>
  );
};

export default BreadCumb;
