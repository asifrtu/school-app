import { subjectInput } from "@/schemas/subjectSchema";
import axios, { isAxiosError } from "axios";

export const createSubject = async (data: subjectInput) => {
    try {
        const response = axios.post('/api/subject', data);
        return response.data;
        
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // ✅ Extract custom backend message
        const message = error.response.data.message;
        return message;
      }
    }
}