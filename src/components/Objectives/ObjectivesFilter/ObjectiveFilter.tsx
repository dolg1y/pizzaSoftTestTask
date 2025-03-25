import * as React from 'react';
import FlexGrid from '../../layout/Grid';
import styles from './ObjectiveFilter.module.scss';
import { Button, Divider, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  IconButtonAdd,
  IconFilterDefueling,
  IconFilterDeliveries,
  IconFilterRemont,
  IconFilterTO,
} from '../../../assets/svg';
import {
  FilterByCategory,
  FilterByEmployee,
  FilterByStatusObjective,
  FilterSearch,
} from '../../Filter/Filter';
import AddTaskModal from '../ObjectivesAdd/ObjectivesAdd';
import { useEffect, useState } from 'react';
import { RootState } from '../../../store/rootReducer';
import { loadCounterCategory } from '../../../store/slices/counterCategory';
import { AppDispatch } from '../../../store/store';

interface ObjectiveFilterProps {
  onFilterChange: (newFilters: {
    employeeFilter: string[];
    statusObjectivesFilter: string[];
    categoryFilter: string[];
  }) => void;
}

const ObjectiveFilter: React.FC<ObjectiveFilterProps> = ({
  onFilterChange,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [employeeFilter, setEmployeeFilter] = useState<string[]>([]);
  const [statusObjectivesFilter, setStatusObjectivesFilter] = useState<
    string[]
  >([]);
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const { counterCategoryList, loading, error } = useSelector(
    (state: RootState) => state.counterCategory
  );

  useEffect(() => {
    dispatch(loadCounterCategory());
  }, [dispatch]);

  const categoryIcons: { [key: string]: JSX.Element } = {
    Ремонт: <IconFilterRemont />,
    Дефектовка: <IconFilterDefueling />,
    ТО: <IconFilterTO />,
    Поставки: <IconFilterDeliveries />,
  };

  const handleEmployeeFilterChange = (selectedEmployees: string[]) => {
    setEmployeeFilter(selectedEmployees);
    onFilterChange({
      employeeFilter: selectedEmployees,
      statusObjectivesFilter,
      categoryFilter,
    });
  };

  const handleStatusObjectiveFilterChange = (status: string[]) => {
    setStatusObjectivesFilter(status);
    onFilterChange({
      employeeFilter,
      statusObjectivesFilter: status,
      categoryFilter,
    });
  };

  const handleCategoryFilterChange = (category: string[]) => {
    setCategoryFilter(category);
    onFilterChange({
      employeeFilter,
      statusObjectivesFilter,
      categoryFilter: category,
    });
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <FlexGrid className={styles.ObjectiveFilter}>
        <Button className={styles.Button} onClick={handleOpenModal}>
          <IconButtonAdd />
          <Typography fontWeight={600} fontSize={16} color="var(--color-black)">
            Добавить задачу
          </Typography>
        </Button>
        <Divider />
        <FlexGrid className={styles.Filter}>
          <FilterSearch />
          <FilterByEmployee onFilterChange={handleEmployeeFilterChange} />
          <FlexGrid gap={8}>
            <FilterByStatusObjective
              onFilterChange={handleStatusObjectiveFilterChange}
            />
            <FilterByCategory onFilterChange={handleCategoryFilterChange} />
          </FlexGrid>
        </FlexGrid>
        <Divider />
        <FlexGrid className={styles.FilterCategory}>
          {error && <Typography color="error">{error}</Typography>}
          {Array.isArray(counterCategoryList) &&
          counterCategoryList.length > 0 ? (
            counterCategoryList.map((categoryData) => {
              const { name, number } = categoryData;
              const Icon = categoryIcons[name] || <IconFilterRemont />;
              return (
                <FlexGrid gap={12} width="48%" key={name}>
                  {Icon}
                  <FlexGrid gap={10} direction="column">
                    <Typography
                      fontWeight={600}
                      fontSize={24}
                      color="var(--color-text-primary)"
                    >
                      {number}
                    </Typography>
                    <Typography
                      fontWeight={600}
                      fontSize={14}
                      color="var(--color-text-second)"
                    >
                      {name}
                    </Typography>
                  </FlexGrid>
                </FlexGrid>
              );
            })
          ) : (
            <Typography>Нет данных</Typography>
          )}
        </FlexGrid>
      </FlexGrid>
      <AddTaskModal open={modalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default ObjectiveFilter;
