import { createSlice } from '@reduxjs/toolkit';
import { createStudentThunk } from './studentThunks';
interface StudentState {
  loading: boolean;
  error: string | null;
  data: any;
}

const initialState: StudentState = {
  loading: false,
  error: null,
  data: null
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createStudentThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createStudentThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createStudentThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message ?? null;
      });
  },
});

export default studentSlice.reducer;