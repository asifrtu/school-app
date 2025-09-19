import z from "zod";

export const subjectSchema = z.object({
    name: z.string().min(1, {message: "Subject Name is required!."}),
    fullMarks: z.number().min(1, {message: "Full Marks is  required!."}),
    passMarks: z.number().min(1, {message: "Pass Marks is  required!."}),
    teacher: z.string().optional(),
    code: z.string().optional()
});

export type subjectInput = z.infer<typeof subjectSchema>;