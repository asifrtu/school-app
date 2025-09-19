import { subjectInput } from "@/schemas/subjectSchema";
import { createSubject } from "@/services/subject/subject";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createSubjectApi = createAsyncThunk(
    'subject/create', 
    async (payload: subjectInput, {rejectWithValue}) => {
        try {
            return await createSubject(payload)
        } catch (error) {
            console.error('Error creating student:', error);
            const message = error instanceof Error ? error.message : 'Request failed';
            return rejectWithValue(message);
        }
})