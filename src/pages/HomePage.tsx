import React, { useEffect, useState } from 'react';
import Grid from '../components/layout/Grid';
import { IconButton, Typography } from '@mui/material';
import Weather from '../components/Weather/Weather';
import DiagramTechnique from '../components/DiagramTechnique/DiagramTechnique';
import Calendar from '../components/Calendar/Calendar';
import FlexGrid from '../components/layout/Grid';
import {
  IconButtonLink,
  IconDiagramLorem,
  IconImportantTask,
  IconToPage,
  LoremPlys,
} from '../assets/svg';
import { PageProps } from '../models/types';
import ObjectivesList from '../components/Objectives/ObjectivesList/ObjectivesList';
import { Link } from 'react-router-dom';

const HomePage: React.FC<PageProps> = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  const [employeeFilter, setEmployeeFilter] = useState<string[]>([]);
  const [statusObjectivesFilter, setStatusObjectivesFilter] = useState<
    string[]
  >([]);
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);

  return (
    <Grid style={{ margin: '0px 40px' }} direction="column">
      <Grid gap={9}>
        <Grid gap={10} direction="column">
          <Weather />
          {/* <DiagramTechnique /> */}
          <IconDiagramLorem />
        </Grid>
        <Grid justifyContent="space-between" direction="column">
          <Calendar />
          {/* <LoremPlys /> */}
        </Grid>
        <FlexGrid
          style={{
            background: 'var(--main-color-background)',
            width: '762px',
            borderRadius: '34px',
            padding: '10px',
            flexDirection: 'column',
            height: '810px',
          }}
        >
          <FlexGrid marginBottom="16px" justifyContent="space-between">
            <FlexGrid alignItems="center" gap={12}>
              <IconImportantTask />
              <FlexGrid direction="column">
                <Typography
                  fontSize={18}
                  fontWeight={600}
                  color="var(--color-text-primary)"
                >
                  Задачи
                </Typography>
                <Typography
                  fontSize={14}
                  fontWeight={600}
                  color="var(--color-text-third)"
                >
                  На сегодня
                </Typography>
              </FlexGrid>
            </FlexGrid>
            <FlexGrid gap={8}>
              <IconButton className="IconNavigationToPage">
                <Link
                  to="/task"
                  style={{
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <IconButtonLink />
                  <Typography
                    fontSize={'14px'}
                    color="var(--color-text-primary)"
                  >
                    Все задачи
                  </Typography>
                </Link>
              </IconButton>
            </FlexGrid>
          </FlexGrid>
          <ObjectivesList
            employeeFilter={employeeFilter}
            statusObjectivesFilter={statusObjectivesFilter}
            categoryFilter={categoryFilter}
            tasksPerRow={2}
          />
        </FlexGrid>
      </Grid>
    </Grid>
  );
};

export default HomePage;
