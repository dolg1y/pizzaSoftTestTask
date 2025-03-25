import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Employee {
  objectId: string;
  fullName: string;
  birthdate?: Date | string;
  position?: string;
  transport?: string;
  phone?: string;
  email?: string;
}

interface EmployeeState {
  employees: Employee[];
  loading: boolean;
  error: string | null;
}

const initialState: EmployeeState = {
  employees: [],
  loading: false,
  error: null,
};

export const loadEmployees = createAsyncThunk(
  'employees/loadEmployees',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        'https://parseapi.back4app.com/classes/Employees',
        {
          headers: {
            Accept: 'application/json',
            'X-Parse-Application-Id':
              'l3zNqbDePGMqRVjdhJnBPPKenAXSxtRXWMluYlfk',
            'X-Parse-REST-API-Key': 'aAhRQExOdyM8CwHDsaOyw0AIN9I3jnv0Gg0OKzx6',
          },
        }
      );
      return response.data.results;
    } catch (error) {
      return rejectWithValue('Ошибка загрузки сотрудников');
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  'employees/deleteEmployee',
  async (objectId: string, { rejectWithValue }) => {
    try {
      await axios.delete(
        `https://parseapi.back4app.com/classes/Employees/${objectId}`,
        {
          headers: {
            Accept: 'application/json',
            'X-Parse-Application-Id':
              'l3zNqbDePGMqRVjdhJnBPPKenAXSxtRXWMluYlfk',
            'X-Parse-REST-API-Key': 'aAhRQExOdyM8CwHDsaOyw0AIN9I3jnv0Gg0OKzx6',
          },
        }
      );
      return objectId;
    } catch (error) {
      return rejectWithValue('Ошибка при удалении сотрудника');
    }
  }
);

export const addEmployee = createAsyncThunk(
  'employees/addEmployee',
  async (employeeData: Omit<Employee, 'objectId'>, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://parseapi.back4app.com/classes/Employees',
        employeeData,
        {
          headers: {
            Accept: 'application/json',
            'X-Parse-Application-Id':
              'l3zNqbDePGMqRVjdhJnBPPKenAXSxtRXWMluYlfk',
            'X-Parse-REST-API-Key': 'aAhRQExOdyM8CwHDsaOyw0AIN9I3jnv0Gg0OKzx6',
            'Content-Type': 'application/json',
          },
        }
      );
      return { ...employeeData, objectId: response.data.objectId };
    } catch (error) {
      return rejectWithValue('Ошибка при добавлении сотрудника');
    }
  }
);

export const updateEmployee = createAsyncThunk<
  Employee,
  { objectId: string; updatedData: Partial<Employee> }
>(
  'employees/updateEmployee',
  async ({ objectId, updatedData }, { rejectWithValue }) => {
    try {
      await axios.put(
        `https://parseapi.back4app.com/classes/Employees/${objectId}`,
        updatedData,
        {
          headers: {
            Accept: 'application/json',
            'X-Parse-Application-Id':
              'l3zNqbDePGMqRVjdhJnBPPKenAXSxtRXWMluYlfk',
            'X-Parse-REST-API-Key': 'aAhRQExOdyM8CwHDsaOyw0AIN9I3jnv0Gg0OKzx6',
            'Content-Type': 'application/json',
          },
        }
      );

      return { objectId, ...updatedData } as Employee;
    } catch (error) {
      return rejectWithValue('Ошибка при обновлении сотрудника');
    }
  }
);

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loadEmployees.fulfilled,
        (state, action: PayloadAction<Employee[]>) => {
          state.loading = false;
          state.employees = action.payload;
        }
      )
      .addCase(loadEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(
        deleteEmployee.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.employees = state.employees.filter(
            (emp) => emp.objectId !== action.payload
          );
        }
      )
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(
        addEmployee.fulfilled,
        (state, action: PayloadAction<Employee>) => {
          state.employees.push(action.payload);
        }
      )
      .addCase(
        updateEmployee.fulfilled,
        (state, action: PayloadAction<Employee>) => {
          state.employees = state.employees.map((employee) =>
            employee.objectId === action.payload.objectId
              ? { ...employee, ...action.payload }
              : employee
          );
        }
      )

      .addCase(updateEmployee.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default employeeSlice.reducer;
