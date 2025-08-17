'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import z from "zod";

// Student schema
const Student = z.object({
  id: z.string().uuid(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phoneNumber: z.string().min(1),
  status: z.string(),
  roleId: z.string(),
});

type StudentType = z.infer<typeof Student>;

export default function Page() {
  const [studentData, setStudentData] = useState<StudentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/student");

        // Always make sure we have an array
        const rawData: unknown = res.data?.data;
        console.log(rawData);
        const safeArray = Array.isArray(rawData) ? rawData : [];

        // Validate and add default values
        const validatedData: StudentType[] = safeArray || []
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
          .filter((u): u is StudentType => u !== null);

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
      {studentData.length > 0 && (
        studentData.map((student) => (
          <ul key={student.id} className="flex gap-4 p-4 text-sm">
          <li className="text-sm border border-gray-400 ">{student.firstName + " " + student.lastName}</li>
          <li className="text-sm border border-gray-400 ">{student.email}</li>
          <li className="text-sm border border-gray-400 ">{student.phoneNumber}</li>
          <li className="text-sm border border-gray-400 ">{student.status}</li>
          <li className="text-sm border border-gray-400 ">{student.roleId}</li>
          </ul>
        ))
      )}
      {/* <StudentTable columns={columns} data={[studentData]} /> */}
    </div>
  );
}
