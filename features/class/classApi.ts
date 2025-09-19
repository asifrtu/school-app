import { classInput } from "@/schemas/classSchema";
import { createClass } from "@/services/class/class";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createClassApi = createAsyncThunk(
    'class/create',
    async (payload: classInput, {rejectWithValue}) => {
        try {
            return await createClass(payload);
        } catch (error) {
            console.error('Error creating student:', error);
            const message = error instanceof Error ? error.message : 'Request failed';
            return rejectWithValue(message);
        }
    }
)