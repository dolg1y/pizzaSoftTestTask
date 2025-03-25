import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { counterCategory } from '../../models/types';

interface counterCategoryState {
  counterCategoryList: counterCategory[];
  loading: boolean;
  error: string | null;
}

const initialState: counterCategoryState = {
  counterCategoryList: [],
  loading: false,
  error: null,
};

export const loadCounterCategory = createAsyncThunk(
  'employees/loadCounterCategory',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        'https://parseapi.back4app.com/classes/Counters',
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
      return rejectWithValue('Ошибка загрузки счётчика категорий');
    }
  }
);

const counterCategorySlice = createSlice({
  name: 'counterCategory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCounterCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loadCounterCategory.fulfilled,
        (state, action: PayloadAction<counterCategory[]>) => {
          state.loading = false;
          state.counterCategoryList = action.payload;
        }
      )
      .addCase(loadCounterCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default counterCategorySlice.reducer;
