import { TeacherInput } from "@/schemas/teacherSchema";
import axios from "axios";

export const createTeacher = async (data: TeacherInput) => {
    try {
        const response = await axios.post('/api/teacher', data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
        // ✅ Extract custom backend message
        const message = error.response.data.message;
        return message;
      }
    }
}