import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  TextField,
  Typography,
  InputAdornment,
  Autocomplete,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import FlexGrid from '../../layout/Grid';
import {
  Category,
  Employee,
  StatusObjectives,
  Task,
  Transport,
} from '../../../models/types';
import {
  IconFilterArrow,
  IconFilterByEmployee,
  IconModalAddEmployeeBirthday,
  IconModalAddEmployeeTransport,
  IconModalStatus,
  IconModalTypeObjectives,
} from '../../../assets/svg';
import { addTask } from '../../../store/slices/taskList';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { loadCategory } from '../../../store/slices/categoryList';
import { loadTransport } from '../../../store/slices/transportList';
import { loadStatusObjectives } from '../../../store/slices/statusList';

interface AddTaskDialogProps {
  open: boolean;
  onClose: () => void;
}

const AddTaskDialog: React.FC<AddTaskDialogProps> = ({ open, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (open) {
      dispatch(loadCategory());
      dispatch(loadTransport());
      dispatch(loadStatusObjectives());
    }
  }, [dispatch, open]);

  const { statusObjectivesList, loading: statusObjectivesLoading } =
    useSelector((state: RootState) => state.statusObjectives);

  const { transportList, loading: transportLoading } = useSelector(
    (state: RootState) => state.transport
  );

  const { employees, loading: employeeLoading } = useSelector(
    (state: RootState) => state.employees
  );
  const { categoryList, loading: categoryLoading } = useSelector(
    (state: RootState) => state.category
  );

  const [form, setForm] = useState({
    taskCategory: '',
    taskTitle: '',
    taskPriority: '',
    taskAssigneeName: '',
    description: '',
    taskTransport: '',
  });

  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const [errors, setErrors] = useState({
    taskCategory: false,
    taskTitle: false,
    taskPriority: false,
    taskAssigneeName: false,
    description: false,
    startDate: false,
    endDate: false,
    taskTransport: false,
  });

  useEffect(() => {
    if (!open) {
      setForm({
        taskCategory: '',
        taskTitle: '',
        taskPriority: '',
        taskAssigneeName: '',
        description: '',
        taskTransport: '',
      });
      setStartDate(null);
      setEndDate(null);
      setErrors({
        taskCategory: false,
        taskTitle: false,
        taskPriority: false,
        taskAssigneeName: false,
        description: false,
        startDate: false,
        endDate: false,
        taskTransport: false,
      });
    }
  }, [open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {
      taskCategory: !form.taskCategory?.trim(),
      taskTitle: !form.taskTitle?.trim(),
      taskPriority: !form.taskPriority?.trim(),
      taskAssigneeName: !form.taskAssigneeName?.trim(),
      description: !form.description?.trim(),
      startDate: !startDate,
      endDate: !endDate,
      taskTransport: !form.taskTransport?.trim(),
    };
    setErrors(newErrors);

    console.log('Ошибки:', newErrors);
    return !Object.values(newErrors).includes(true);
  };

  const handleAddTask = () => {
    if (validateForm()) {
      const newTask: Task = {
        taskCategory: form.taskCategory,
        taskTitle: form.taskTitle,
        taskPriority: form.taskPriority,
        taskAssigneeName: form.taskAssigneeName,
        description: form.description,
        taskTransport: form.taskTransport,
        taskRangeDateStart: startDate
          ? { __type: 'Date', iso: dayjs(startDate) }
          : null,
        taskRangeDateEnd: endDate
          ? { __type: 'Date', iso: dayjs(endDate) }
          : null,
      };

      dispatch(addTask(newTask))
        .then(() => {
          setForm({
            taskCategory: '',
            taskTitle: '',
            taskPriority: '',
            taskAssigneeName: '',
            description: '',
            taskTransport: '',
          });
          setStartDate(null);
          setEndDate(null);
          setErrors({
            taskCategory: false,
            taskTitle: false,
            taskPriority: false,
            taskAssigneeName: false,
            description: false,
            startDate: false,
            endDate: false,
            taskTransport: false,
          });
          onClose();
        })
        .catch((error) => console.error('Ошибка:', error));
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <FlexGrid direction="column" gap={16} padding="16px">
        <Typography
          fontWeight={600}
          fontSize={24}
          color="var(--color-text-primary)"
        >
          Добавить задачу
        </Typography>
        <Typography fontSize={14} color="var(--color-text-second)">
          Заполните все поля
        </Typography>
      </FlexGrid>
      <DialogContent sx={{ marginTop: '24px' }}>
        <Autocomplete
          popupIcon={<IconFilterArrow />}
          options={categoryList}
          loading={categoryLoading}
          getOptionLabel={(option: Category) => option.category}
          fullWidth
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Категория"
              color="success"
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
          onChange={(_, value: Category | null) =>
            setForm((prev) => ({
              ...prev,
              taskCategory: value ? value.category : '',
            }))
          }
        />

        <Autocomplete
          popupIcon={<IconFilterArrow />}
          options={transportList}
          loading={transportLoading}
          getOptionLabel={(option: Transport) => option.transport}
          fullWidth
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Транспорт"
              color="success"
              fullWidth
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <IconModalAddEmployeeTransport />
                  </InputAdornment>
                ),
              }}
            />
          )}
          onChange={(_, value: Transport | null) =>
            setForm((prev) => ({
              ...prev,
              taskTransport: value ? value.transport : '',
            }))
          }
        />

        <TextField
          placeholder="Название задачи"
          name="taskTitle"
          value={form.taskTitle}
          onChange={handleChange}
          error={errors.taskTitle}
          fullWidth
          margin="normal"
        />
        <TextField
          placeholder="Описание задачи"
          name="description"
          value={form.description}
          onChange={handleChange}
          error={errors.description}
          fullWidth
          margin="normal"
          multiline
          rows={3}
        />
        <Autocomplete
          popupIcon={<IconFilterArrow />}
          options={statusObjectivesList}
          loading={statusObjectivesLoading}
          getOptionLabel={(option: StatusObjectives) => option.status}
          fullWidth
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Статус задачи"
              color="success"
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
          onChange={(_, value: StatusObjectives | null) =>
            setForm((prev) => ({
              ...prev,
              taskPriority: value ? value.status : '',
            }))
          }
        />

        <FlexGrid gap={8}>
          <DatePicker
            label="Дата начала"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            slotProps={{
              textField: {
                error: errors.startDate,
                helperText: errors.startDate ? 'Период с' : '',
                fullWidth: true,
                margin: 'normal',
                InputProps: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconModalAddEmployeeBirthday />
                    </InputAdornment>
                  ),
                },
              },
            }}
          />
          <DatePicker
            label="Период по"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            slotProps={{
              textField: {
                error: errors.endDate,
                helperText: errors.endDate ? 'Выберите дату окончания' : '',
                fullWidth: true,
                margin: 'normal',
                InputProps: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconModalAddEmployeeBirthday />
                    </InputAdornment>
                  ),
                },
              },
            }}
          />
        </FlexGrid>
        <Autocomplete
          fullWidth
          popupIcon={<IconFilterArrow />}
          options={employees || []}
          loading={employeeLoading}
          getOptionLabel={(option: Employee) => option.fullName || ''}
          value={
            employees.find((e) => e.fullName === form.taskAssigneeName) || null
          }
          onChange={(_, value: Employee | null) => {
            console.log('Выбранный сотрудник:', value);

            setForm((prev) => ({
              ...prev,
              taskAssigneeName: value ? value.fullName : '',
            }));
          }}
          isOptionEqualToValue={(option, value) =>
            option.objectId === value.objectId
          }
          renderInput={(params) => (
            <TextField
              color="success"
              {...params}
              placeholder="Ответственный"
              fullWidth
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <IconFilterByEmployee />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      </DialogContent>
      <DialogActions style={{ marginTop: '24px' }}>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={handleAddTask} color="primary">
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTaskDialog;
