import { sectionInput } from "@/schemas/sectionSchema";
import { createSection } from "@/services/section/section";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createSectionApi = createAsyncThunk(
    'section/create',
    async (payload: sectionInput, {rejectWithValue}) => {
        try {
            return await createSection(payload)
        } catch (error) {
            console.error('Error creating student:', error);
            const message = error instanceof Error ? error.message : 'Request failed';
            return rejectWithValue(message);
        }
    }
)