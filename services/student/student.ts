import axios from 'axios';
import { StudentInput } from '@/schemas/studentSchema';


export const createStudent = async (data: StudentInput) => {
 try {
   const response = await axios.post('/api/student', data);
   return response.data;
  } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // ✅ Extract custom backend message
        const message = error.response.data.message;
        return message;
      }
    }
};