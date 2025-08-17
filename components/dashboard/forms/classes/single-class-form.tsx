"use client";

import { z } from "zod"
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Mail, Phone, User } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod"
import TextInput from "@/components/FormInputs/TextInput";
import PasswordInput from "@/components/FormInputs/PasswordInput";
import FormSelectInput from "@/components/FormInputs/FormSelectInput";
import UploadStudentImageForm from "@/components/upload-student-image-form";
import { singleStudentSchema } from "@/schemas/studentSchema";
import TextAreaInput from "@/components/FormInputs/TextAreaInput";

export default function SingleClassForm() {
// const initialImage = initialData?.imageUrl || "/placeholder.png"; // Replace with your actual initial image URL
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof singleStudentSchema>>({
    resolver: zodResolver(singleStudentSchema),
  });
  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof singleStudentSchema>) => {
   alert("Class created successfully");
    console.log("Submitted Data:", data);
  }

  return (
    <div className="w-full dark:bg-black dark:text-white border border-t-4 border-gray-600 rounded-md mb-5 pb-5">
      <div className="mx-auto dark:bg-black px-4 pt-2 shadow">
        {/* Header */}
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold">Create Class</h1>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
            >
              Close
            </button>
            <button
              type="submit"
              form="single-student-form"
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-blue-500"
            >
              Save Class
            </button>
          </div>
        </div>

        {/* Form */}
        <form
          id="single-student-form"
          className="grid grid-cols-1 md:grid-cols-3 gap-x-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* TextInput Fields */}
          <TextInput
            label="Full Name"
            register={register}
            name="fullName"
            placeholder="Enter full name"
            icon={User}
            errors={errors}
            tooltipText=""
          />
          <TextInput
            label="Email Address"
            register={register}
            name="email"
            type="email"
            placeholder="Enter email"
            icon={Mail}
            errors={errors}
            tooltipText=""
          />
          <TextInput
            label="Phone Number"
            register={register}
            name="phoneNumber"
            type="tel"
            placeholder="Enter phoneNumber"
            icon={Phone}
            errors={errors}
            tooltipText=""
          />
        </form>
      </div>
    </div>
  );
}
