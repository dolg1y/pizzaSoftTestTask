import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadEmployees, deleteEmployee } from '../../store/slices/employeeList';
import { RootState, AppDispatch } from '../../store/store';
import Table from '../layout/table/Table';
import {
  IconButton,
  Link,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Typography,
} from '@mui/material';
import FlexGrid from '../layout/Grid';
import {
  IconButtonDelete,
  IconEmployeeTableActionChat,
  IconEmployeeTableActionDelete,
  IconEmployeeTableActionEdit,
} from '../../assets/svg';
import EditEmployeeDialog from '../EmployeeTable/EditEmployeeDialog/EditEmployeeDialog';
import styles from './EmployeeTable.module.scss';
import { Employee } from '../../models/types';

interface EmployeeTableProps {
  selectedPositions: string[];
}

const EmployeeList: React.FC<EmployeeTableProps> = ({ selectedPositions }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { employees } = useSelector((state: RootState) => state.employees);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  useEffect(() => {
    dispatch(loadEmployees());
  }, [dispatch]);

  const handleOpenEditDialog = (employee: Employee) => {
    setSelectedEmployee({
      ...employee,
      birthdate: employee.birthdate,
      position: employee.position ?? '',
    });
    setOpenEditDialog(true);
  };

  const handleOpenDeleteDialog = (employee: Employee) => {
    setSelectedEmployee({
      ...employee,
      birthdate: employee.birthdate,
      position: employee.position ?? '',
    });
    setOpenDeleteDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedEmployee(null);
  };

  const filteredEmployees = employees.filter(
    (employee) =>
      selectedPositions.length === 0 ||
      selectedPositions.includes(employee.position ?? '')
  );

  return (
    <>
      {filteredEmployees.length > 0 ? (
        <Table
          headers={[
            [
              'ФИО',
              'Дата рождения',
              'Должность',
              'Закреплённый транспорт',
              'Контакт',
              'Email',
              'Действия',
            ],
          ]}
          content={filteredEmployees.map((employee) => [
            <FlexGrid>{employee.fullName || '-'}</FlexGrid>,
            <FlexGrid>
              {employee.birthdate &&
              typeof employee.birthdate === 'object' &&
              'iso' in employee.birthdate &&
              typeof employee.birthdate.iso === 'string'
                ? new Date(employee.birthdate.iso).toLocaleDateString('ru-RU', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })
                : 'Нет даты'}
            </FlexGrid>,
            <FlexGrid>{employee.position || '-'}</FlexGrid>,
            <FlexGrid>{employee.transport || '-'}</FlexGrid>,
            <FlexGrid>
              <Link href={'tel:' + employee.phone}>
                {employee.phone || '-'}
              </Link>
            </FlexGrid>,
            <FlexGrid>
              <Link href={'mailto:' + employee.email}>
                {employee.email || '-'}
              </Link>
            </FlexGrid>,
            <FlexGrid justifyContent="flex-end">
              <IconButton onClick={() => handleOpenEditDialog(employee)}>
                <FlexGrid className={styles.ActionItem}>
                  <IconEmployeeTableActionEdit />
                </FlexGrid>
              </IconButton>
              <IconButton onClick={() => handleOpenDeleteDialog(employee)}>
                <FlexGrid className={styles.ActionItem}>
                  <IconEmployeeTableActionDelete />
                </FlexGrid>
              </IconButton>
            </FlexGrid>,
          ])}
        />
      ) : (
        <FlexGrid width="100%" justifyContent="center">
          <Typography
            fontSize={48}
            align="center"
            color="var(--color-text-primary)"
            fontWeight={600}
          >
            Нет данных
          </Typography>
        </FlexGrid>
      )}

      {selectedEmployee && (
        <EditEmployeeDialog
          open={openEditDialog}
          employee={selectedEmployee}
          onClose={handleCloseEditDialog}
        />
      )}

      <Dialog open={openDeleteDialog} onClose={handleCloseEditDialog}>
        <DialogTitle color="var(--color-text-primary)">
          Удаление сотрудника
        </DialogTitle>
        <DialogContent>
          <DialogContentText color="var(--color-text-primary)">
            {selectedEmployee?.fullName}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary">
            Отменить
          </Button>
          <Button
            onClick={() => {
              if (selectedEmployee?.objectId) {
                dispatch(deleteEmployee(selectedEmployee.objectId));
              }
              handleCloseEditDialog();
            }}
            color="error"
          >
            <IconButtonDelete /> Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EmployeeList;
