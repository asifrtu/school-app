import { TeacherInput } from "@/schemas/teacherSchema";
import { createTeacher } from "@/services/teacher/teacher";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createTeacherThunk = createAsyncThunk(
    'teacher/create', 
    async (payload: TeacherInput, { rejectWithValue }) => {
        try {
            return await createTeacher(payload)
        } catch (error) {
            console.error('Error creating student:', error);
            const message = error instanceof Error ? error.message : 'Request failed';
            return rejectWithValue(message);
        }
    })