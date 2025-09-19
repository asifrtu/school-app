import z from "zod"

export const classSchema = z.object({
    name: z.string().min(1, {message: "The class is required!."})
});

export type classInput = z.infer<typeof classSchema>;


