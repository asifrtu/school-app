"use client";

import { nullable, z, ZodError } from "zod";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Check, ChevronLeft, ChevronRight, Mail, Phone, User } from "lucide-react";
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
import { use, useEffect, useState } from "react";
import { Status, StudentInput, studentSchema } from "@/schemas/studentSchema";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { createStudentThunk } from "@/features/student/studentThunks";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function StudentForm() {
  const [step, setStep] = useState<number>(1);
  const totalSteps = 4;
  const progressValue = Math.round((step / totalSteps) * 100);

  const nextStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // ✅ Make sure this is here
    if (step < totalSteps) setStep((prev) => prev + 1);
  };
  

  const prevStep = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string>("");
  const dispatch = useAppDispatch();
  const { loading, data, error } = useSelector((state: any) => state.student);
  // const selector = (state: any) => state.student;
  // const student = useAppSelector(selector);
  // const router = useRouter();
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
  ];
  const religions: Option[] = [
    { label: "Hindu", value: "hindu" },
    { label: "Muslim", value: "muslim" },
    { label: "Christian", value: "christian" },
    { label: "Sikh", value: "sikh" },
    { label: "Jain", value: "jain" },
  ];
  const castes: Option[] = [
    { label: "General", value: "general" },
    { label: "OBC", value: "obc" },
    { label: "SC", value: "sc" },
    { label: "ST", value: "st" },
  ];
  const disabilities: Option[] = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
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
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentInput>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      roleId: 1,
      status: Status.ACTIVE,
      session: "",
      classSt: "",
      rollNumber: "",
      admissionDate: new Date(),
      dateOfBirth: new Date(),
      gender: "",
      religion: "",
      caste: "",
      bloodGroup: "",
      disability: "",
      disease: "",
      fatherName: "",
      motherName: "",
      guardianName: "",
      emergencyContact: "",
      address1: "",
      address2: "",
      notes: "",
      studentImage: "",
    },
  });

  const router = useRouter();
  const onSubmit = async (data: StudentInput) => {
    const payload = {
      ...data,
      studentImage: imageName,
    };
    dispatch(createStudentThunk(payload));
  };
  useEffect(() => {
    if (data) {
      toast.success(data.message);
    }
    if (error) {
      toast.error(error.message);
    }
  }, [data, error]);
  return (
    <div className="w-full dark:bg-black dark:text-white shadow mb-5 pb-5">
      <div className="mx-auto dark:bg-black px-4 pt-2 border border-t-4 border-gray-600 rounded-md md:mx-7 md:my-4">
        {/* Header */}
        <InfoBanner
          variant="info"
          message="Please first Create the Parent, Class, and Stream."
        />
<div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
  <h1 className="text-2xl font-bold">Create Student</h1>

  {/* Centered Progress Bar on md and larger */}
  <div className="w-full md:w-auto md:flex-1 md:flex md:justify-center">
    {/* <span className="text-md font-medium">{progressValue}%</span> */}
    <Progress value={progressValue} max={totalSteps} className="w-full max-w-md" />
  </div>

  {/* Button Group */}
  <div className="flex gap-2 justify-end">
    {step == totalSteps ? (
      <Button
        type="submit"
        form="single-student-form"
        className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-500"
      >
        Save Student
      </Button>
    ) : (
      <Button
        type="button"
        onClick={() => router.back()}
        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
      >
        Close
      </Button>
    )}
  </div>
        </div>


          {/* Form */}
          <form id="single-student-form" onSubmit={handleSubmit(onSubmit)}>
          {step === 1 && (
            <>
              <FormInfo message="Student Basic Information | Personal Details" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6">
                {/* TextInput Fields */}
                <TextInput
                  label="First Name"
                  control={control}
                  name="firstName"
                  placeholder="Enter First Name"
                  icon={User}
                  errors={errors}
                  tooltipText=""
                />
                <TextInput
                  label="Last Name"
                  control={control}
                  name="lastName"
                  placeholder="Enter Last Name"
                  icon={User}
                  errors={errors}
                  tooltipText=""
                />
                <TextInput
                  label="Email Address"
                  control={control}
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  icon={Mail}
                  errors={errors}
                  tooltipText=""
                />
                <TextInput
                  label="Phone Number"
                  control={control}
                  name="phoneNumber"
                  type="tel"
                  placeholder="Enter phone Number"
                  icon={Phone}
                  errors={errors}
                  tooltipText=""
                />
                <PasswordInput
                  label="Password"
                  control={control}
                  name="password"
                  placeholder="Enter password"
                  errors={errors}
                />
                <PasswordInput
                  label="Confirm Password"
                  control={control}
                  name="confirmPassword"
                  placeholder="Enter Confirm Password"
                  errors={errors}
                />
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <FormInfo message="Student Academic Information | Academic Details" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6">
                <FormSelectInput
                  name="session"
                  label="Session"
                  options={sessions}
                  control={control}
                  errors={errors}
                />
                <FormSelectInput
                  name="classSt"
                  label="Class"
                  options={classes}
                  control={control}
                  errors={errors}
                />
                <TextInput
                  label="Roll Number"
                  control={control}
                  name="rollNumber"
                  type="text"
                  placeholder="Enter Roll Number"
                  errors={errors}
                  tooltipText=""
                />
                <TextInput
                  label="Date of Addmission"
                  control={control}
                  name="addmissionDate"
                  type="date"
                  placeholder="dd-mm-yyyy"
                  errors={errors}
                  tooltipText=""
                />
                <TextInput
                  label="Date of Birth"
                  control={control}
                  name="dateOfBirth"
                  type="date"
                  placeholder="dd-mm-yyyy"
                  errors={errors}
                  tooltipText=""
                />

                {/* Gender Dropdown */}
                <FormSelectInput
                  name="Gender"
                  label="gender"
                  options={genders}
                  control={control}
                  errors={errors}
                />
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <FormInfo message="Student Personal Information | Other Details" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6">
                <FormSelectInput
                  name="Religion"
                  label="religion"
                  options={religions}
                  control={control}
                  errors={errors}
                />
                <FormSelectInput
                  name="Caste"
                  label="caste"
                  options={castes}
                  control={control}
                  errors={errors}
                />
                <FormSelectInput
                  name="bloodGroup"
                  label="Blood Group"
                  options={bloodGroups}
                  control={control}
                  errors={errors}
                />
                <FormSelectInput
                  name="disability"
                  label="Disability (if any)"
                  options={disabilities}
                  control={control}
                  errors={errors}
                />

                <TextInput
                  label="Disease (if any)"
                  control={control}
                  name="disease"
                  type="text"
                  placeholder="Enter desease if any"
                  errors={errors}
                  tooltipText=""
                />

                <TextInput
                  label="Father's Name"
                  control={control}
                  name="fatherName"
                  type="text"
                  placeholder="Enter Father's Name"
                  errors={errors}
                  tooltipText=""
                />
                <TextInput
                  label="Mother's Name"
                  control={control}
                  name="motherName"
                  type="text"
                  placeholder="Enter Mother's Name"
                  errors={errors}
                  tooltipText=""
                />
                <TextInput
                  label="Guardian Name"
                  control={control}
                  name="guardianName"
                  type="text"
                  placeholder="Enter guardianc's Name"
                  errors={errors}
                  tooltipText=""
                />

                <TextInput
                  label="Emergency Contact"
                  control={control}
                  name="emergencyContact"
                  type="tel"
                  placeholder="Enter emergency contact"
                  errors={errors}
                  tooltipText=""
                />
              </div>
              </>
              )}

              {step === 4 && (
            <>
              <FormInfo message="Student Other Information | Other Details" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6">
                <div className="col-span-1 md:col-span-2">
                  <TextInput
                    label="Address1"
                    control={control}
                    name="address1"
                    type="text"
                    placeholder="Enter address"
                    errors={errors}
                    tooltipText=""
                  />

                  <TextInput
                    label="Address2"
                    control={control}
                    name="address2"
                    type="text"
                    placeholder="Enter address"
                    errors={errors}
                    tooltipText=""
                  />
                  <TextAreaInput
                    label="Description / Notes"
                    className="w-full rounded-md border px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400"
                    control={control}
                    name="notes"
                    placeholder="Enter any additional notes or information"
                    errors={errors}
                  />
                  {/* <TextInput
              label="Image URL"
              name="studentImage"
              control={control} errors={errors} tooltipText={""} placeholder={""} type="text"
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
                {/* <UploadStudentImageForm control={control} errors={errors} /> */}
                <div>
                  <UploadButton
                    endpoint="imageUploader" // must match the slug defined in server config
                    onClientUploadComplete={(res) => {
                      if (!res || res.length === 0) return;
                      console.log("Upload response:", res);
                      setUploadedImage(res[0].ufsUrl); // preview
                      setImageName(res[0].name); // get file name
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
            </>
          )}

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4 mt-5">
            {step > 1 && (
              <Button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-500"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
            )}
            <div className="flex gap-2">
              {step === totalSteps ? (
                <Button
                  type="submit"
                  form="single-student-form"
                  className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-500"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Submit Form
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-500"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
                
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
