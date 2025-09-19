import z from "zod"

export const sectionSchema = z.object({
    name: z.string().min(1, {message: "The class is required!."}),
    classId: z.string().min(1, {message: "The class is required!."}),
    teacherId: z.string().optional(),
});

export type sectionInput = z.infer<typeof sectionSchema>;