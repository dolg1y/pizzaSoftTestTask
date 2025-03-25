import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { updateEmployee } from '../../../store/slices/employeeList';
import { loadTransport } from '../../../store/slices/transportList';
import { loadPosition } from '../../../store/slices/positionList';
import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  TextField,
  Typography,
  Autocomplete,
  InputAdornment,
} from '@mui/material';
import FlexGrid from '../../layout/Grid';
import {
  IconFilterArrow,
  IconModalAddEmployeeBirthday,
  IconModalAddEmployeeMail,
  IconModalAddEmployeePhone,
  IconModalAddEmployeePosition,
  IconModalAddEmployeeSave,
  IconModalAddEmployeeTransport,
  IconModalAddEmployeeUser,
} from '../../../assets/svg';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import InputMask from 'react-input-mask';
import validator from 'validator';
import { Employee, Position, Props, Transport } from '../../../models/types';

interface EditEmployeeDialogProps extends Props {
  employee: Employee | null;
}

const EditEmployeeDialog: React.FC<EditEmployeeDialogProps> = ({
  open,
  onClose,
  employee,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [form, setForm] = useState({
    fullName: '',
    birthdate: '',
    position: '',
    transport: '',
    phone: '',
    email: '',
  });

  const [errors, setErrors] = useState({
    fullName: false,
    birthdate: false,
    position: false,
    transport: false,
    phone: false,
    email: false,
  });

  const { transportList, loading: transportLoading } = useSelector(
    (state: RootState) => state.transport
  );
  const { positionList, loading: positionLoading } = useSelector(
    (state: RootState) => state.position
  );

  useEffect(() => {
    if (open) {
      dispatch(loadTransport());
      dispatch(loadPosition());
      if (employee) {
        setForm({
          fullName: employee.fullName,
          birthdate: employee.birthdate || '',
          position: employee.position || '',
          transport: employee.transport || '',
          phone: employee.phone || '',
          email: employee.email || '',
        });
      }
    }
  }, [open, dispatch, employee]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {
      fullName: !form.fullName.trim(),
      birthdate: !form.birthdate,
      position: !form.position.trim(),
      transport: !form.transport.trim(),
      phone: !form.phone.trim(),
      email: !validator.isEmail(form.email),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  };

  const handleUpdateEmployee = () => {
    if (validateForm()) {
      if (!employee || !employee.objectId) return;

      const updatedEmployee = {
        objectId: employee.objectId,
        updatedData: {
          fullName: form.fullName,
          birthdate: form.birthdate,
          position: form.position,
          transport: form.transport,
          phone: form.phone,
          email: form.email,
        },
      };

      dispatch(updateEmployee(updatedEmployee));
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <FlexGrid direction="column" gap={16}>
        <Typography
          fontWeight={600}
          fontSize={24}
          color="var(--color-text-primary)"
        >
          Редактировать сотрудника
        </Typography>
      </FlexGrid>
      <DialogContent sx={{ marginTop: '24px' }}>
        <TextField
          color="success"
          placeholder="ФИО"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          error={errors.fullName}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconModalAddEmployeeUser />
              </InputAdornment>
            ),
          }}
        />
        <DatePicker
          slots={{ openPickerIcon: IconFilterArrow }}
          value={form.birthdate ? dayjs(form.birthdate) : null}
          slotProps={{
            textField: {
              placeholder: '27 января 1978',
              error: errors.birthdate,
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
        <Autocomplete
          popupIcon={<IconFilterArrow />}
          options={transportList}
          loading={transportLoading}
          getOptionLabel={(option: Transport) => option.transport}
          value={
            transportList.find((t) => t.transport === form.transport) || null
          }
          onChange={(_, value) =>
            setForm((prev) => ({
              ...prev,
              transport: value ? value.transport : '',
            }))
          }
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
        />
        <Autocomplete
          popupIcon={<IconFilterArrow />}
          options={positionList}
          loading={positionLoading}
          getOptionLabel={(option: Position) => option.position}
          value={positionList.find((p) => p.position === form.position) || null}
          onChange={(_, value) =>
            setForm((prev) => ({
              ...prev,
              position: value ? value.position : '',
            }))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Должность"
              color="success"
              fullWidth
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <IconModalAddEmployeePosition />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <FlexGrid gap={16} marginBottom="24px">
          <TextField
            color="success"
            placeholder="Номер"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            error={errors.phone}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconModalAddEmployeePhone />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            color="success"
            placeholder="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconModalAddEmployeeMail />
                </InputAdornment>
              ),
            }}
          />
        </FlexGrid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={handleUpdateEmployee} color="success">
          <IconModalAddEmployeeSave />
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditEmployeeDialog;
