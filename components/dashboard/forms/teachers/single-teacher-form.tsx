"use client";


import { nullable, z, ZodError } from "zod";
import {useForm } from "react-hook-form";
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
import { TeacherSchema, Status, TeacherInput } from "@/schemas/teacherSchema";


export default function SingleTeacherForm() {

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [imageName, setImageName] = useState<string>(""); 

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
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TeacherInput>({
    resolver: zodResolver(TeacherSchema),
    defaultValues: {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    roleId: 1,
    status: Status.ACTIVE,
    session: '',
    classSt: '',
    subject: '',
    joiningDate: new Date(),
    dateOfBirth: new Date(),
    gender: '',
    religion: '',
    caste: '',
    bloodGroup: '',
    disability: '',
    fatherName: '',
    motherName: '',
    emergencyContact: '',
    address1: '',
    address2: '',
    notes: '',
    teacherImage: '',
  }
  });
 

  const router = useRouter();


  const onSubmit = async (data: TeacherInput) => {
  try {
      const payload = {
        ...data,
        teacherImage: imageName,
      };
    // Submit the form data via Axios
    const res = await axios.post("/api/teacher", payload, 
      // { headers: { "Content-Type": "multipart/form-data" } }
    );

   
    console.log("resData", res.data.message);
    toast.success(res.data.message);
    // router.push('/dashboard/students'); // Uncomment if you need to redirect
  } catch (error) {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 409) {
      // Conflict - email or phone exists
      toast.error(error.response.data.message);
    } else if (error.response?.status === 422) {
      // Validation error
      toast.error(error.response.data.message);
      alert(error.response.data.message);
    } else {
      // Other errors
      alert("Request failed: " + (error.response?.data?.message || error.message));
    }
  } else {
    alert("Unexpected error");
  }
}
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
          <h1 className="text-2xl font-bold">Create Teacher</h1>
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
              form="single-teacher-form"
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-500"
            >
              Save Teacher
            </button>
          </div>
        </div>

        {/* Form */}
        <form id="single-teacher-form" onSubmit={handleSubmit(onSubmit)}>
          
        <FormInfo message="Teacher Basic Information | Personal Details" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6" >
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
        <FormInfo message="Teacher Academic Information | Academic Details" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6" >
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
            label="Subject"
            control={control}
            name="subject"
            type="text"
            placeholder="Enter Subject"
            errors={errors}
            tooltipText=""
          />
        </div>
        <FormInfo message="Teacher Other Information | Other Details" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6" >
          <TextInput
            label="Date of Joining Date"
            control={control}
            name="joiningDate"
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
            name="gender"
            label="Gender"
            options={genders}
            control={control}
            errors={errors}
          />
          <FormSelectInput
            name="religion"
            label="Religion"
            options={religions}
            control={control}
            errors={errors}
          />
          <FormSelectInput
            name="caste"
            label="Caste"
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
            label="Emergency Contact"
            control={control}
            name="emergencyContact"
            type="tel"
            placeholder="Enter emergency contact"
            errors={errors}
            tooltipText=""
          />
          
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
          <div className="col-span-1 md:col-span-2">
              
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
