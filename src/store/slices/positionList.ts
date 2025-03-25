import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Position {
  objectId: string;
  position: string;
}

interface PositionState {
  positionList: Position[];
  loading: boolean;
  error: string | null;
}

const initialState: PositionState = {
  positionList: [],
  loading: false,
  error: null,
};

export const loadPosition = createAsyncThunk(
  'employees/loadPosition',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        'https://parseapi.back4app.com/classes/Position',
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
      return rejectWithValue('Ошибка загрузки транспорта');
    }
  }
);

const positionSlice = createSlice({
  name: 'position',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadPosition.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loadPosition.fulfilled,
        (state, action: PayloadAction<Position[]>) => {
          state.loading = false;
          state.positionList = action.payload;
        }
      )
      .addCase(loadPosition.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default positionSlice.reducer;
