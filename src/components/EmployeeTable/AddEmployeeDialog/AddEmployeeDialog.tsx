import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { addEmployee } from '../../../store/slices/employeeList';
import { loadTransport } from '../../../store/slices/transportList';
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
  IconModalAddEmployee,
  IconModalAddEmployeeBirthday,
  IconModalAddEmployeeMail,
  IconModalAddEmployeePhone,
  IconModalAddEmployeePosition,
  IconModalAddEmployeeTransport,
  IconModalAddEmployeeUser,
} from '../../../assets/svg';
import { loadPosition } from '../../../store/slices/positionList';
import { Position, Props, Transport } from '../../../models/types';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import InputMask from 'react-input-mask';
import validator from 'validator';

const AddEmployeeDialog: React.FC<Props> = ({ open, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [form, setForm] = useState({
    fullName: '',
    birthdate: undefined as Date | undefined,
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
    } else {
      setForm({
        fullName: '',
        birthdate: undefined,
        position: '',
        transport: '',
        phone: '',
        email: '',
      });
      setErrors({
        fullName: false,
        birthdate: false,
        position: false,
        transport: false,
        phone: false,
        email: false,
      });
    }
  }, [open, dispatch]);

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

  const handleAddEmployee = () => {
    if (validateForm()) {
      const employeeData: any = {
        ...form,
        birthdate: form.birthdate
          ? { __type: 'Date', iso: (form.birthdate as Date).toISOString() }
          : undefined,
      };

      dispatch(addEmployee(employeeData));
      onClose();
      setForm({
        fullName: '',
        birthdate: undefined,
        position: '',
        transport: '',
        phone: '',
        email: '',
      });
      setErrors({
        fullName: false,
        birthdate: false,
        position: false,
        transport: false,
        phone: false,
        email: false,
      });
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
          Добавить сотрудника
        </Typography>
        <Typography fontSize={14} color="var(--color-text-second)">
          Заполните все поля
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
          value={form.birthdate ? dayjs(form.birthdate) : undefined}
          onChange={(date) => {
            setForm((prev) => ({
              ...prev,
              birthdate: date ? date.toDate() : undefined,
            }));
          }}
          slotProps={{
            textField: {
              placeholder: '27 января 1978',
              name: 'birthdate',
              error: errors.birthdate,
              InputProps: {
                startAdornment: (
                  <InputAdornment sx={{ padding: 0 }} position="start">
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
          fullWidth
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Транспорт"
              color="success"
              error={errors.transport}
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
              transport: value ? value.transport : '',
            }))
          }
        />
        <Autocomplete
          popupIcon={<IconFilterArrow />}
          options={positionList}
          loading={positionLoading}
          getOptionLabel={(option: Position) => option.position}
          fullWidth
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Должность"
              color="success"
              error={errors.position}
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
          onChange={(_, value: Position | null) =>
            setForm((prev) => ({
              ...prev,
              position: value ? value.position : '',
            }))
          }
        />
        <FlexGrid gap={16} marginBottom="24px">
          <InputMask
            mask="+7 (999) 999-99-99"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          >
            {(inputProps: any) => (
              <TextField
                {...inputProps}
                color="success"
                placeholder="Телефон"
                name="phone"
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
            )}
          </InputMask>
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
        <Button onClick={handleAddEmployee} color="success">
          <IconModalAddEmployee />
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEmployeeDialog;
