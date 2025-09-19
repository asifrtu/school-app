import { configureStore } from '@reduxjs/toolkit';
import studentReducer from '@/features/student/studentSlice';
import teacherReducer from '@/features/teacher/teacherSlice';
import classReducer from '@/features/class/classSlice';
import sectionReducer from '@/features/section/sectionSlice';


export const store = configureStore({
  reducer: {
    student: studentReducer,
    teacher: teacherReducer,
    class: classReducer,
    section: sectionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;