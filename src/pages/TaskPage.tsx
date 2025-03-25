import React, { useEffect, useState } from 'react';
import Grid from '../components/layout/Grid';
import ObjectiveList from '../components/Objectives/ObjectivesList/ObjectivesList';
import ObjectiveFilter from '../components/Objectives/ObjectivesFilter/ObjectiveFilter';

const TaskPage: React.FC = () => {
  const [filters, setFilters] = useState({
    employeeFilter: [],
    statusObjectivesFilter: [],
    categoryFilter: [],
  });

  const handleFilterChange = (newFilters: any) => {
    setFilters({
      ...filters,
      ...newFilters,
    });
  };

  return (
    <Grid
      direction="column"
      style={{ width: '100%', margin: '0px 30px 0px 20px' }}
    >
      <Grid direction="row" gap={10}>
        <ObjectiveFilter onFilterChange={handleFilterChange} />
        <ObjectiveList
          tasksPerRow={3}
          employeeFilter={filters.employeeFilter}
          statusObjectivesFilter={filters.statusObjectivesFilter}
          categoryFilter={filters.categoryFilter}
        />
      </Grid>
    </Grid>
  );
};

export default TaskPage;
