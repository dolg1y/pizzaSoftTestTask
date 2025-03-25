import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Category } from '../../models/types';


interface CategoryState {
  categoryList: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categoryList: [],
  loading: false,
  error: null,
};

export const loadCategory = createAsyncThunk(
  'employees/loadCategory',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        'https://parseapi.back4app.com/classes/Category',
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
      return rejectWithValue('Ошибка загрузки категорий');
    }
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loadCategory.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.loading = false;
          state.categoryList = action.payload;
        }
      )
      .addCase(loadCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default categorySlice.reducer;
