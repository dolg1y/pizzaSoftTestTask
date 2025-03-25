import {
  Paper,
  IconButton,
  InputBase,
  Autocomplete,
  TextField,
  InputAdornment,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  IconFilterArrow,
  IconFilterByDuration,
  IconFilterByEmployee,
  IconModalStatus,
  IconModalTypeObjectives,
  IconSearch,
} from '../../assets/svg';

import styles from './Filter.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  Category,
  Employee,
  Position,
  StatusObjectives,
} from '../../models/types';
import { RootState } from '../../store/rootReducer';
import { loadPosition } from '../../store/slices/positionList';
import { AppDispatch } from '../../store/store';
import { loadEmployees } from '../../store/slices/employeeList';

interface FilterByDurationProps {
  onFilterChange: (selected: string[]) => void;
}

export const FilterSearch = () => {
  return (
    <Paper component="form" className={styles.FilterSearch}>
      <IconButton sx={{ p: '10px' }} aria-label="menu">
        <IconSearch />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Поиск"
        inputProps={{ 'aria-label': 'Поиск' }}
      />
    </Paper>
  );
};

export const FilterByDuration: React.FC<FilterByDurationProps> = ({
  onFilterChange,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { positionList, loading: positionLoading } = useSelector(
    (state: RootState) => state.position
  );

  const [selectedPositions, setSelectedPositions] = useState<Position[]>([]);

  useEffect(() => {
    dispatch(loadPosition());
  }, [dispatch]);

  const handleChange = (_: any, newValue: Position[] | null) => {
    setSelectedPositions(newValue || []);
    onFilterChange((newValue || []).map((pos) => pos.position));
  };

  return (
    <Autocomplete
      multiple
      popupIcon={<IconFilterArrow />}
      disablePortal
      options={positionList || []}
      loading={positionLoading}
      getOptionLabel={(option: Position) => option.position || ''}
      value={selectedPositions}
      onChange={handleChange}
      isOptionEqualToValue={(option, value) =>
        option.objectId === value.objectId
      }
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          color="success"
          {...params}
          placeholder="По должности"
          sx={{ fontSize: '14px', color: 'var(--color-text-primary)' }}
          fullWidth
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <IconFilterByDuration className={styles.FilterByDurationIcon} />
            ),
          }}
        />
      )}
    />
  );
};

export const FilterByEmployee: React.FC<FilterByDurationProps> = ({
  onFilterChange,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { employees, loading: employeeLoading } = useSelector(
    (state: RootState) => state.employees
  );

  const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    dispatch(loadEmployees());
  }, [dispatch]);

  const handleChange = (_: any, newValue: Employee[] | null) => {
    setSelectedEmployees(newValue || []);
    onFilterChange((newValue || []).map((emp) => emp.fullName));
  };

  return (
    <Autocomplete
      className={styles.FilterByEmployee}
      multiple
      popupIcon={<IconFilterArrow />}
      disablePortal
      options={employees || []}
      loading={employeeLoading}
      getOptionLabel={(option: Employee) => option.fullName || ''}
      value={selectedEmployees}
      onChange={handleChange}
      isOptionEqualToValue={(option, value) =>
        option.objectId === value.objectId
      }
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          color="success"
          {...params}
          placeholder="Ответственный"
          sx={{ fontSize: '14px', color: 'var(--color-text-primary)' }}
          fullWidth
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <IconFilterByEmployee className={styles.FilterByEmployeeIcon} />
            ),
          }}
        />
      )}
    />
  );
};

export const FilterByStatusObjective: React.FC<FilterByDurationProps> = ({
  onFilterChange,
}) => {
  const { statusObjectivesList, loading: statusObjectivesLoading } =
    useSelector((state: RootState) => state.statusObjectives);

  const [selectedStatus, setSelectedStatus] = useState<StatusObjectives | null>(
    null
  );

  const handleChange = (_: any, newValue: StatusObjectives | null) => {
    setSelectedStatus(newValue);
    onFilterChange(newValue ? [newValue.status] : []);
  };

  return (
    <Autocomplete
      className={styles.FilterByStatus}
      popupIcon={<IconFilterArrow />}
      disablePortal
      options={statusObjectivesList || []}
      loading={statusObjectivesLoading}
      getOptionLabel={(option: StatusObjectives) => option.status || ''}
      value={selectedStatus}
      onChange={handleChange}
      isOptionEqualToValue={(option, value) =>
        option.objectId === value.objectId
      }
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          color="success"
          {...params}
          placeholder="Статус задачи"
          sx={{ fontSize: '14px', color: 'var(--color-text-primary)' }}
          fullWidth
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <IconModalStatus />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};

export const FilterByCategory: React.FC<FilterByDurationProps> = ({
  onFilterChange,
}) => {
  const { categoryList, loading: categoryLoading } = useSelector(
    (state: RootState) => state.category
  );

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const handleChange = (_: any, newValue: Category | null) => {
    setSelectedCategory(newValue);
    onFilterChange(newValue ? [newValue.category] : []);
  };

  return (
    <Autocomplete
      className={styles.FilterByCategory}
      popupIcon={<IconFilterArrow />}
      disablePortal
      options={categoryList || []}
      loading={categoryLoading}
      getOptionLabel={(option: Category) => option.category || ''}
      value={selectedCategory}
      onChange={handleChange}
      isOptionEqualToValue={(option, value) =>
        option.objectId === value.objectId
      }
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          color="success"
          {...params}
          placeholder="Тип задачи"
          sx={{ fontSize: '14px', color: 'var(--color-text-primary)' }}
          fullWidth
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <IconModalTypeObjectives />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};
