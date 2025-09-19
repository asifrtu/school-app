import { classInput } from "@/schemas/classSchema";
import axios from "axios";

export const createClass = async (data: classInput) => {
    try {
        const response = axios.post('/api/class', data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            // ✅ Extract custom backend message
            const message = error.response.data.message;
            return message;
        }
    }
}