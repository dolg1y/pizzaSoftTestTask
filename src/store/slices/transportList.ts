import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Transport {
  objectId: string;
  transport: string;
}

interface TransportState {
  transportList: Transport[];
  loading: boolean;
  error: string | null;
}

const initialState: TransportState = {
  transportList: [],
  loading: false,
  error: null,
};

export const loadTransport = createAsyncThunk(
  'employees/loadTransport',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        'https://parseapi.back4app.com/classes/Transport',
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

const transportSlice = createSlice({
  name: 'transport',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadTransport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loadTransport.fulfilled,
        (state, action: PayloadAction<Transport[]>) => {
          state.loading = false;
          state.transportList = action.payload;
        }
      )
      .addCase(loadTransport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default transportSlice.reducer;
