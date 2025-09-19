import { createSlice } from '@reduxjs/toolkit';
import { createSubjectApi } from './subjectApi';
interface SubjectState {
  loading: boolean;
  error: string | null;
  data: any;
}

const initialState: SubjectState = {
  loading: false,
  error: null,
  data: null
};

const subjectSlice = createSlice({
  name: 'subject',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createSubjectApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(createSubjectApi.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createSubjectApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message ?? null;
      });
  },
});

export default subjectSlice.reducer;