import { createAsyncThunk } from '@reduxjs/toolkit';
import { createStudent } from '@/services/student/student';
import { StudentInput } from '@/schemas/studentSchema';

export const createStudentThunk = createAsyncThunk(
  'student/create',
  async (payload: StudentInput, { rejectWithValue }) => {
    try {
      return await createStudent(payload);
    } catch (error) {
      console.error('Error creating student:', error);
      const message = error instanceof Error ? error.message : 'Request failed';
      return rejectWithValue(message);
    }
  }
);