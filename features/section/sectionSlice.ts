import { createSlice } from '@reduxjs/toolkit';
import { createSectionApi } from './sectionApi';
interface SectionState {
  loading: boolean;
  error: string | null;
  data: any;
}

const initialState: SectionState = {
  loading: false,
  error: null,
  data: null
};

const sectionSlice = createSlice({
  name: 'class',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createSectionApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(createSectionApi.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createSectionApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message ?? null;
      });
  },
});

export default sectionSlice.reducer;