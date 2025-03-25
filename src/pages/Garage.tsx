import React, { useState } from 'react';
import { PageProps } from '../models/types';
import FlexGrid from '../components/layout/Grid';
import { FilterByDuration, FilterSearch } from '../components/Filter/Filter';
import EmployeeTable from '../components/EmployeeTable/EmployeeTable';
import { Button } from '@mui/material';
import { IconButtonAdd } from '../assets/svg';
import AddEmployeeDialog from '../components/EmployeeTable/AddEmployeeDialog/AddEmployeeDialog';

const Garage: React.FC<PageProps> = () => {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);

  const handleOpenAddDialog = () => setOpenAddDialog(true);
  const handleCloseAddDialog = () => setOpenAddDialog(false);

  return (
    <FlexGrid
      gap={20}
      direction="column"
      margin="0px 30px 0px 20px"
      width="100%"
    >
      <FlexGrid justifyContent="space-between">
        <FlexGrid gap={8}>
          <FilterSearch />
          <FilterByDuration onFilterChange={setSelectedPositions} />
        </FlexGrid>
        <Button
          variant="contained"
          color="success"
          onClick={handleOpenAddDialog}
        >
          <IconButtonAdd />
          Добавить сотрудника
        </Button>
      </FlexGrid>
      <FlexGrid>
        <EmployeeTable selectedPositions={selectedPositions} />
      </FlexGrid>

      <AddEmployeeDialog open={openAddDialog} onClose={handleCloseAddDialog} />
    </FlexGrid>
  );
};

export default Garage;
