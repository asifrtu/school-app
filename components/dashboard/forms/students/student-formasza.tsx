"use client";


import { nullable, z, ZodError } from "zod";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Mail, Phone, User } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "@/components/FormInputs/TextInput";
import PasswordInput from "@/components/FormInputs/PasswordInput";
import FormSelectInput from "@/components/FormInputs/FormSelectInput";
import TextAreaInput from "@/components/FormInputs/TextAreaInput";
import InfoBanner from "@/components/info-banner";
import axios, { AxiosError } from "axios";
import { NextResponse } from "next/server";
import FormInfo from "@/components/info/form-info";
import { toast, ToastT } from "sonner";
import { UploadButton } from "@/lib/uploadthing";
import { useState } from "react";
import { StudentInput, studentSchema } from "@/schemas/studentSchema";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { createStudentThunk } from "@/features/student/studentThunks";


export default function studentForm() {

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string>(""); 
  const dispatch = useAppDispatch();
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
  const bloodGroups: Option[] = [
    { label: "A+", value: "A+" },
    { label: "A-", value: "A-" },
    { label: "B+", value: "B+" },
    { label: "B-", value: "B-" },
    { label: "O+", value: "O+" },
    { label: "O-", value: "O-" },
    { label: "AB+", value: "AB+" },
    { label: "AB-", value: "AB-" },
  ]
  const religions: Option[] = [
    { label: "Hindu", value: "hindu" },
    { label: "Muslim", value: "muslim" },
    { label: "Christian", value: "christian" },
    { label: "Sikh", value: "sikh" },
    { label: "Jain", value: "jain" },
  ]
  const castes: Option[] = [
    { label: "General", value: "general" },
    { label: "OBC", value: "obc" },
    { label: "SC", value: "sc" },
    { label: "ST", value: "st" },
  ]
  const disabilities: Option[] = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ]
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
  } = useForm<StudentInput>({resolver: zodResolver(studentSchema)});
 
  const router = useRouter();
  const onSubmit = async (data: StudentInput) => {
    const payload = {
      ...data,
      studentImage: imageName,
    };
    dispatch(createStudentThunk(payload));
  };

  return (
    <div className="w-full dark:bg-black dark:text-white shadow mb-5 pb-5">
      <div className="mx-auto dark:bg-black px-4 pt-2 border border-t-4 border-gray-600 rounded-md md:mx-7 md:my-4">
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
        <form id="single-student-form" onSubmit={handleSubmit(onSubmit)}>
          
        <FormInfo message="Student Basic Information | Personal Details" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6" >
          {/* TextInput Fields */}
          <TextInput
            label="First Name"
            register={register}
            name="firstName"
            placeholder="Enter First Name"
            icon={User}
            errors={errors}
            tooltipText=""
          />
          <TextInput
            label="Last Name"
            register={register}
            name="lastName"
            placeholder="Enter Last Name"
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
          <PasswordInput
            label="Password"
            register={register}
            name="password"
            placeholder="Enter password"
            errors={errors}
          />
          <PasswordInput
            label="Confirm Password"
            register={register}
            name="confirmPassword"
            placeholder="Enter Confirm Password"
            errors={errors}
          />
          
          
        </div>
        <FormInfo message="Student Academic Information | Academic Details" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6" >
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
                value={
                  sessions.find((cls) => cls.value === field.value) || null
                }
                errors={errors}
                isSearchable={false}
                placeholder="Select Session"
              />
            )}
          />
          <Controller
            name="classSt"
            control={control}
            render={({ field }) => (
              <FormSelectInput
                label="Class"
                name="classSt"
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
          
          <TextInput
            label="Roll Number"
            register={register}
            name="rollNumber"
            type="text"
            placeholder="Enter Roll Number"
            errors={errors}
            tooltipText=""
          />
        </div>
        <FormInfo message="Student Other Information | Other Details" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6" >
          <TextInput
            label="Date of Addmission"
            register={register}
            name="addmissionDate"
            type="date"
            placeholder="dd-mm-yyyy"
            errors={errors}
            tooltipText=""
          />
          <TextInput
            label="Date of Birth"
            register={register}
            name="dateOfBirth"
            type="date"
            placeholder="dd-mm-yyyy"
            errors={errors}
            tooltipText=""
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
          <Controller
            name="religion"
            control={control}
            render={({ field }) => (
              <FormSelectInput
                label="Religion"
                name="religion"
                options={religions}
                onChange={(val) => {
                  if (!val || Array.isArray(val)) return field.onChange(""); // optional: guard against bad input
                  field.onChange(val.value);
                }}
                value={religions.find((cls) => cls.value === field.value) || null}
                errors={errors}
                isSearchable={false}
                placeholder="Select Religion"
              />
            )}
          />
          <Controller
            name="caste"
            control={control}
            render={({ field }) => (
              <FormSelectInput
                label="Caste"
                name="caste"
                options={castes}
                onChange={(val) => {
                  if (!val || Array.isArray(val)) return field.onChange(""); // optional: guard against bad input
                  field.onChange(val.value);
                }}
                value={castes.find((cls) => cls.value === field.value) || null}
                errors={errors}
                isSearchable={false}
                placeholder="Select Caste"
              />
            )}
          />
          <Controller
            name="bloodGroup"
            control={control}
            render={({ field }) => (
              <FormSelectInput
                label="Blood Group"
                name="bloodGroup"
                options={bloodGroups}
                onChange={(val) => {
                  if (!val || Array.isArray(val)) return field.onChange(""); // optional: guard against bad input
                  field.onChange(val.value);
                }}
                value={bloodGroups.find((cls) => cls.value === field.value) || null}
                errors={errors}
                isSearchable={false}
                placeholder="Select Blood Group"
              />
            )}
          />
          <Controller
            name="disability"
            control={control}
            render={({ field }) => (
              <FormSelectInput
                label="Disability (if any)"
                name="disability"
                options={disabilities}
                onChange={(val) => {
                  if (!val || Array.isArray(val)) return field.onChange(""); // optional: guard against bad input
                  field.onChange(val.value);
                }}
                value={disabilities.find((cls) => cls.value === field.value) || null}
                errors={errors}
                isSearchable={false}
                placeholder="Enter disability (if any) if any"
              />
            )}
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
            placeholder="Enter Father's Name"
            errors={errors}
            tooltipText=""
          />
          <TextInput
            label="Mother's Name"
            register={register}
            name="motherName"
            type="text"
            placeholder="Enter Mother's Name"
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
              className="w-full rounded-md border px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400"
              register={register}
              name="notes"
              placeholder="Enter any additional notes or information"
              errors={errors}
              />
          {/* <TextInput
              label="Image URL"
              name="studentImage"
              register={register} errors={errors} tooltipText={""} placeholder={""} type="text"
              setValue("studentImage", imageName);           /> */}
          </div>
          {/* <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    // Do something with the response
                    console.log("Files: ", res);
                    alert("Upload Completed");
                  }}
                  onUploadError={(error: Error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                  }}
                /> */}
          {/* <UploadStudentImageForm register={register} errors={errors} /> */}
          <div>
      <UploadButton
        endpoint="imageUploader" // must match the slug defined in server config
        onClientUploadComplete={(res) => {
          if (!res || res.length === 0) return;
          console.log("Upload response:", res);
          setUploadedImage(res[0].ufsUrl); // preview
          setImageName(res[0].name);    // get file name
        }}
        onUploadError={(error) => {
          console.error("Upload error:", error.message);
        }}
      />

      {uploadedImage && (
        <div>
          <p>Image preview:</p>
          <img src={uploadedImage} alt="preview" className="w-40" />
          <p className="text-sm text-gray-500">Name: {imageName}</p>
        </div>
      )}
    </div>
        </div>
        </form>
      </div>
    </div>
  );
}
