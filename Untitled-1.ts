"use client";


import { z, ZodError } from "zod";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Mail, Phone, User } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "@/components/FormInputs/TextInput";
import PasswordInput from "@/components/FormInputs/PasswordInput";
import FormSelectInput from "@/components/FormInputs/FormSelectInput";
import UploadStudentImageForm from "@/components/upload-student-image-form";
import { singleStudentSchema } from "@/schemas/studentSchema";
import TextAreaInput from "@/components/FormInputs/TextAreaInput";
import InfoBanner from "@/components/info-banner";
import axios from "axios";
import { NextResponse } from "next/server";


export default function SingleStudentForm() {
  type Option = {
    value: string; // ❗ Change this from `string | number` to `string`
    label: string;
    [key: string]: any;
  };
  const genders: Option[] = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];
  const sessions: Option[] = [
    { label: "2023-2024", value: "2023-2024" },
    { label: "2024-2025", value: "2024-2025" },
    { label: "2025-2026", value: "2025-2026" },
  ];
  const classes: Option[] = [
    { label: "Nursery", value: "nursery" },
    { label: "LKG", value: "lkg" },
    { label: "UKG", value: "ukg" },
  ];
  const sections: Option[] = [
  { label: "A", value: "A" },
  { label: "B", value: "B" },
  { label: "C", value: "C" },
];

  // const initialImage = initialData?.imageUrl || "/placeholder.png"; // Replace with your actual initial image URL
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof singleStudentSchema>>({
    resolver: zodResolver(singleStudentSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      admissionDate: "", // You can use new Date() or keep as string and coerce
      class:  "",
      session:"",
      section:"",
      gender: "",
      dateOfBirth: "",
      password: "",
      religion: "",
      disability: "",
      caste: "",
      bloodGroup: "",
      disease: "",
      fatherName: "",
      fatherOccupation: "",
      motherName: "",
      motherOccupation: "",
      guardianName: "",
      emergencyContact: "",
      address1: "",
      address2: "",
      notes: "",
      // studentImage: null,
    },
  });
  const router = useRouter();


  const onSubmit = async (data: z.infer<typeof singleStudentSchema>) => {
  try {
    console.log("Submitted Data:", data);
    const res = await axios.post("/api/student", data);
    console.log(res.data);
    alert(res.data.message);
    router.push("/dashboard/students");
  } catch (error: any) {
  
      if (error instanceof ZodError) {
        return NextResponse.json({
          message: 'Validation Failed',
          errors: error.errors
        }, { status: 422 });
      }
  
      if (error instanceof Error) {
        return NextResponse.json({ message: "Bhai Error Hai" }, { status: 400 });
      }
    }
};


  return (
    <div className="w-full dark:bg-black dark:text-white border border-t-4 border-gray-600 rounded-md mb-5 pb-5">
      <div className="mx-auto dark:bg-black px-4 pt-2 shadow">
        {/* Header */}
        <InfoBanner
          variant="info"
          message="Please first Create the Parent, Class, and Stream."
        />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold">Create Student</h1>
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
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-500"
            >
              Save Student
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
            placeholder="Enter phone Number"
            icon={Phone}
            errors={errors}
            tooltipText=""
          />
          <TextInput
            label="Admission Date"
            register={register}
            name="admissionDate"
            type="date"
            placeholder="dd-mm-yyyy"
            errors={errors}
            tooltipText=""
          />
          <Controller
            name="session"
            control={control}
            render={({ field }) => (
              <FormSelectInput
                label="Session"
                name="session"
                options={sessions}
                onChange={(val) => {
                  if (!val || Array.isArray(val)) return field.onChange(""); // optional: guard against bad input
                  field.onChange(val.value);
                }}
                value={sessions.find((cls) => cls.value === field.value) || null}
                errors={errors}
                isSearchable={false}
                placeholder="Select Session"
              />
            )}
          />
          <Controller
            name="class"
            control={control}
            render={({ field }) => (
              <FormSelectInput
                label="Class"
                name="class"
                options={classes}
                onChange={(val) => {
                  if (!val || Array.isArray(val)) return field.onChange(""); // optional: guard against bad input
                  field.onChange(val.value);
                }}
                value={classes.find((cls) => cls.value === field.value) || null}
                errors={errors}
                isSearchable={false}
                placeholder="Select Class"
              />
            )}
          />
          <Controller
            name="section"
            control={control}
            render={({ field }) => (
              <FormSelectInput
                label="Section"
                name="section"
                options={sections}
                onChange={(val) => {
                  if (!val || Array.isArray(val)) return field.onChange(""); // optional: guard against bad input
                  field.onChange(val.value);
                }}
                value={sections.find((cls) => cls.value === field.value) || null}
                errors={errors}
                isSearchable={false}
                placeholder="Select Section"
              />
            )}
          />


          {/* <TextInput
            label="Class / Grade"
            register={register}
            name="className"
            type="text"
            placeholder="e.g. 10th Grade"
            errors={errors}
            tooltipText=""
          />
          <TextInput
            label="Section"
            register={register}
            name="section"
            type="text"
            placeholder="e.g. A"
            errors={errors}
            tooltipText=""
          /> */}
          <TextInput
            label="Date of Birth"
            register={register}
            name="dateOfBirth"
            type="date"
            placeholder="dd-mm-yyyy"
            errors={errors}
            tooltipText=""
          />

          <PasswordInput
            label="Password"
            register={register}
            name="password"
            placeholder="Enter password"
            errors={errors}
          />
          {/* Gender Dropdown */}
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <FormSelectInput
                label="Gender"
                name="gender"
                options={genders}
                onChange={(val) => {
                  if (!val || Array.isArray(val)) return field.onChange(""); // optional: guard against bad input
                  field.onChange(val.value);
                }}
                value={genders.find((cls) => cls.value === field.value) || null}
                errors={errors}
                isSearchable={false}
                placeholder="Select Gender"
              />  
            )}
          />
          <TextInput
            label="Disability"
            register={register}
            name="disability"
            type="text"
            placeholder="Enter Disability"
            errors={errors}
            tooltipText=""
          />
          <TextInput
            label="Cast"
            register={register}
            name="caste"
            type="text"
            placeholder="Enter cast"
            errors={errors}
            tooltipText=""
          />
          <TextInput
            label="Religion"
            register={register}
            name="religion"
            type="text"
            placeholder="Enter religion"
            errors={errors}
            tooltipText=""
          />
          <TextInput
            label="Blood Group"
            register={register}
            name="bloodGroup"
            type="text"
            placeholder="Enter blood group"
            errors={errors}
            tooltipText=""
          />
          <TextInput
            label="Disease (if any)"
            register={register}
            name="disease"
            type="text"
            placeholder="Enter desease if any"
            errors={errors}
            tooltipText=""
          />
          <TextInput
            label="Father's Name"
            register={register}
            name="fatherName"
            type="text"
            placeholder="Enter father's name"
            errors={errors}
            tooltipText=""
          />
          <TextInput
            label="Father's Occupation"
            register={register}
            name="fatherOccupation"
            type="text"
            placeholder="Enter father's occupation"
            errors={errors}
            tooltipText=""
          />
          <TextInput
            label="Mother's Name"
            register={register}
            name="motherName"
            type="text"
            placeholder="Enter mother's name"
            errors={errors}
            tooltipText=""
          />
          <TextInput
            label="Mother's Occupation"
            register={register}
            name="motherOccupation"
            type="text"
            placeholder="Enter mother's occupation"
            errors={errors}
            tooltipText=""
          />

          <TextInput
            label="Guardian Name"
            register={register}
            name="guardianName"
            type="text"
            placeholder="Enter guardianc's Name"
            errors={errors}
            tooltipText=""
          />
          <TextInput
            label="Emergency Contact"
            register={register}
            name="emergencyContact"
            type="tel"
            placeholder="Enter emergency contact"
            errors={errors}
            tooltipText=""
          />
          <div className="col-span-1 md:col-span-2">
            <TextInput
              label="Address1"
              register={register}
              name="address1"
              type="text"
              placeholder="Enter address"
              errors={errors}
              tooltipText=""
            />
            <TextInput
              label="Address2"
              register={register}
              name="address2"
              type="text"
              placeholder="Enter address"
              errors={errors}
              tooltipText=""
            />
            <TextAreaInput
              label="Description / Notes"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              register={register}
              name="notes"
              placeholder="Enter any additional notes or information"
              errors={errors}
            />
          </div>
          {/* <UploadStudentImageForm register={register} errors={errors} /> */}
        </form>
      </div>
    </div>
  );
}
