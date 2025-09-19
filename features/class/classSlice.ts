import { createSlice } from '@reduxjs/toolkit';
import { createClassApi } from './classApi';

interface ClassState {
  loading: boolean;
  error: string | null;
  data: any;
}
  
const initialState: ClassState = {
  loading: false,
  error: null,
  data: null
};

const classSlice = createSlice({
  name: 'class',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createClassApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(createClassApi.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createClassApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message ?? null;
      });
  },
});

export default classSlice.reducer;