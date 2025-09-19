import { sectionInput } from "@/schemas/sectionSchema";
import axios, { isAxiosError } from "axios";

export const createSection = async (data: sectionInput) => {
    try {
        const response = axios.post('/api/section', data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            // ✅ Extract custom backend message
            const message = error.response.data.message;
            return message;
        }
    }
}