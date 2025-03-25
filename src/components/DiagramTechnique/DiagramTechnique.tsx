import React from 'react';

import styles from './DiagramTechnique.module.scss';

import { IconDiagram, IconDown } from '../../assets/svg/index';

import FlexGrid from '../layout/Grid';
import { Link, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts';

const DiagramTechnique: React.FC = () => {
  const pieData = [
    { id: 0, value: 50, label: '2 ед', color: 'var(--color-green)' },
    { id: 1, value: 25, label: '1 ед', color: 'var(--color-red)' },
    { id: 2, value: 25, label: '1 ед', color: 'var(--color-orange)' },
  ];

  return (
    <FlexGrid
      direction="column"
      padding={10}
      className={styles.DiagramTechnique}
    >
      <FlexGrid
        justifyContent="space-between"
        className={styles.DiagramTechnique__title}
      >
        <FlexGrid gap={12}>
          <IconDiagram />
          <FlexGrid justifyContent="center" direction="column">
            <Typography fontSize={14} color="var(--color-text-primary)">
              Диаграмма
            </Typography>
            <Typography fontSize={12} color="var(--color-text-second)">
              Техника
            </Typography>
          </FlexGrid>
        </FlexGrid>
        {/* <Link to="/">
          <IconDown></IconDown>
        </Link> */}
      </FlexGrid>
      <FlexGrid justifyContent="space-between">
        <FlexGrid className={styles.DiagramTechnique__classification}>
          <div className={styles.DiagramTechnique__classificationBlack}></div>
          <Typography color="var(--color-text-primary)">Исправна</Typography>
        </FlexGrid>
        <FlexGrid className={styles.DiagramTechnique__classification}>
          <div className={styles.DiagramTechnique__classificationYellow}></div>
          <Typography color="var(--color-text-primary)">ТО</Typography>
        </FlexGrid>
        <FlexGrid className={styles.DiagramTechnique__classification}>
          <div className={styles.DiagramTechnique__classificationRed}></div>
          <Typography color="var(--color-text-primary)">В ремонте</Typography>
        </FlexGrid>
      </FlexGrid>
      <PieChart
        width={280}
        height={280}
        slotProps={{
          legend: { hidden: true },
        }}
        sx={{
          [`& .MuiPieArc-root`]: {
            stroke: 'none',
          },
        }}
        series={[
          {
            data: pieData,
            innerRadius: 60,
            outerRadius: 94,
            paddingAngle: 1,
            cornerRadius: 9,
            startAngle: 0,
            endAngle: 370,
            cx: 150,
            cy: 150,
          },
        ]}
      />
      <FlexGrid>
        <img src="../../" alt="" />
      </FlexGrid>
    </FlexGrid>
  );
};

export default DiagramTechnique;
