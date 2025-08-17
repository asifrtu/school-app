// app/(dashboard)/students/page.tsx
'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import { StudentTable } from "@/components/dashboard/forms/students/student-table";
import { columns } from "@/components/dashboard/forms/students/columns";
import z from "zod";

// Schema for one student
const Student = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email(),
  status: z.string().optional(),
  roleId: z.string().optional(),
});

export default function Page() {
  const [studentData, setStudentData] = useState<z.infer<typeof Student>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/student");

        // Always make sure we have an array
        const rawData: unknown = res.data?.data;
        const safeArray = Array.isArray(rawData) ? rawData : [];

        // Strictly validate and only keep valid entries
        const validatedData = safeArray
          .map((user) => {
            const parsed = Student.safeParse(user);
            if (parsed.success) {
              return {
                ...parsed.data,
                status: "Active",
                roleId: "User",
              };
            }
            return null;
          })
          .filter((u): u is z.infer<typeof Student>[] => u !== null);

        setStudentData(validatedData);
      } catch (err) {
        console.error("Failed to fetch student data", err);
        setError("Something went wrong while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-4 text-sm">Loading...</div>;
  if (error) return <div className="p-4 text-sm text-red-500">{error}</div>;

  return (
    <div className="container py-10 mx-auto">
      <StudentTable columns={columns} data={studentData} />
    </div>
  );
}
