import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
const Student = z.object({
  id: z.string().uuid(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phoneNumber: z.string().min(1),
  status: z.string(),
  roleId: z.string(),
});

export const columns: ColumnDef<z.infer<typeof Student>[]>[] = [
  
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "firstName",
    header: "First",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "roleId",
    header: "Role",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone",
  },

];
