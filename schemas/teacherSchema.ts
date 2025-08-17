// Import Zod
import { match } from "assert";
import { z } from "zod";
import { id } from "zod/v4/locales";
export enum Status {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}
// Define student schema with date conversion
export const TeacherSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email(),
  phoneNumber: z.string(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  roleId: z.number(),
  status: z.nativeEnum(Status).optional().default(Status.ACTIVE),
  // firstFatherName: z.string().min(1, { message: "First father name is required" }),
  // lastFatherName: z.string().min(1, { message: "Last father name is required" }),
  // fatherOccupation: z.string(),
  // motherOccupation: z.string(),
  session: z.string().min(1, { message: "Session is required" }),
  classSt: z.string().min(1, { message: "Class is required" }),
  subject: z.string().min(1, { message: "Subject is required" }),
  joiningDate: z.preprocess((arg) => {
    if (typeof arg === "string" || typeof arg === "number") {
      return new Date(arg);
    }
    return arg;
  }, z.date()),
  dateOfBirth: z.preprocess((arg) => {
    if (typeof arg === "string" || typeof arg === "number") {
      return new Date(arg);
    }
    return arg;
  }, z.date()),
  gender: z.string(),
  religion: z.string(),
  caste: z.string(),
  bloodGroup: z.string(),
  disability: z.string(),
  fatherName: z.string(),
  motherName: z.string(),
  emergencyContact: z.string(),
  address1: z.string(),
  address2: z.string(),
  notes: z.string(),
  teacherImage: z.string().optional(),
  deletedAt: z.date().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
// });
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // error will appear under confirmPassword
  })

.refine(data => data.dateOfBirth < data.joiningDate, {
  message: "Date of birth must be before admission date",
  path: ["dateOfBirth"]
});

export type TeacherInput = z.infer<typeof TeacherSchema>;