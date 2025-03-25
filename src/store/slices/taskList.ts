import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import dayjs, { Dayjs } from 'dayjs';

interface Task {
  objectId?: string;
  taskId?: string;
  taskCategory: string;
  taskTitle: string;
  taskPriority: string;
  taskRangeDateStart?: { __type: 'Date'; iso: Dayjs } | null;
  taskRangeDateEnd?: { __type: 'Date'; iso: Dayjs } | null;
  taskAssigneeName: string;
  assigneePhoto?: {
    __type: 'File';
    name: string;
    url: string;
  };
  description: string;
  taskTransport: string;
}

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        'https://parseapi.back4app.com/classes/Tasks',
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
      return rejectWithValue('Ошибка загрузки задач');
    }
  }
);

export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (newTask: Task, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://parseapi.back4app.com/functions/createTaskWithId',
        newTask,
        {
          headers: {
            Accept: 'application/json',
            'X-Parse-Application-Id':
              'l3zNqbDePGMqRVjdhJnBPPKenAXSxtRXWMluYlfk',
            'X-Parse-REST-API-Key': 'aAhRQExOdyM8CwHDsaOyw0AIN9I3jnv0Gg0OKzx6',
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue('Ошибка добавления задачи');
    }
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.loading = false;
        state.tasks = action.payload.map((task) => ({
          ...task,
          taskRangeDateStart: task.taskRangeDateStart
            ? { __type: 'Date', iso: dayjs(task.taskRangeDateStart.iso) }
            : null,
          taskRangeDateEnd: task.taskRangeDateEnd
            ? { __type: 'Date', iso: dayjs(task.taskRangeDateEnd.iso) }
            : null,
        }));
      })

      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default taskSlice.reducer;
