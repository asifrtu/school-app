import { createSlice } from "@reduxjs/toolkit"
import { createTeacherThunk } from "./teacherThunks"

interface TeacherState {
    loading: boolean
    error: string | null
    data: any
}

const initialState: TeacherState = {
    loading: false,
    error: null,
    data: null
}

const teacherSlice = createSlice({
   name: 'teacher',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
       builder
       .addCase(createTeacherThunk.pending, (state) => {
           state.loading = true
       })
       .addCase(createTeacherThunk.fulfilled, (state, action) => {
           state.loading = false
           state.data = action.payload
       })
       .addCase(createTeacherThunk.rejected, (state, action) => {
           state.loading = false
           state.error = action.error?.message ?? null
       })
   }, 
});


export default teacherSlice.reducer;