import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface StatusObjectives {
  objectId: string;
  status: string;
}

interface StatusState {
  statusObjectivesList: StatusObjectives[];
  loading: boolean;
  error: string | null;
}

const initialState: StatusState = {
  statusObjectivesList: [],
  loading: false,
  error: null,
};

export const loadStatusObjectives = createAsyncThunk(
  'employees/loadStatusObjectives',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        'https://parseapi.back4app.com/classes/Status',
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
      return rejectWithValue('Ошибка загрузки статуса задач');
    }
  }
);

const statusObjectivesSlice = createSlice({
  name: 'statusObjectives',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadStatusObjectives.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loadStatusObjectives.fulfilled,
        (state, action: PayloadAction<StatusObjectives[]>) => {
          state.loading = false;
          state.statusObjectivesList = action.payload;
        }
      )
      .addCase(loadStatusObjectives.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default statusObjectivesSlice.reducer;
