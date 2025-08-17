"use client";

import Link from "next/link";
import {z} from "zod"
import { set, useForm } from "react-hook-form";
import { SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Phone, User } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod"
import TextInput from "@/components/FormInputs/TextInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import PasswordInput from "@/components/FormInputs/PasswordInput";
import FormSelectInput from "@/components/FormInputs/FormSelectInput";
import ImageInput from "@/components/FormInputs/ImageInput";
import UploadStudentImageForm from "@/components/upload-student-image-form";
import { singleStudentSchema } from "@/schemas/studentSchema";
import TextAreaInput from "@/components/FormInputs/TextAreaInput";


export type RegisterInputProps = {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  dob: string;
  gender: string;
  address: string;
  className: string;
  section: string;
  rollNumber: string;
  parentName: string;
  emergencyContact: string;
  image: FileList;
  notes: string;
};

export default function SingleStaffForm() {
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [selectedGender, setSelectedGender] = useState<any>(null);
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [selectedSection, setSelectedSection] = useState<any>(null);
  type Option = {
  value: string;  // ❗ Change this from `string | number` to `string`
  label: string;
  [key: string]: any;
};
  const genders: Option[] = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];
  const classes: Option[] = [
  { label: "Nursery", value: "nursery" },
  { label: "LKG", value: "lkg" },
  { label: "UKG", value: "ukg" },
];
  const sections: Option[] = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

// const initialImage = initialData?.imageUrl || "/placeholder.png"; // Replace with your actual initial image URL
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof singleStudentSchema>>({
    resolver: zodResolver(singleStudentSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      phone: "",
      dob: "",
      gender: "",
      address: "",
      className: "",
      section: "",
      rollNumber: "",
      parentName: "",
      emergencyContact: "",
      image: "",
    }
  });
  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof singleStudentSchema>) => {
    // setIsSubmitDisabled(true);
    // setIsLoading(true);
    const imageFile = data.image?.[0];
    console.log("Submitted Data:", data);
    console.log("Selected Image:", imageFile);
  }

  return (
    <div className="w-full dark:bg-black dark:text-white border border-t-4 border-gray-600 rounded-md mb-5 pb-5">
      <div className="mx-auto dark:bg-black px-4 pt-2 shadow">
        {/* Header */}
        
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
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-blue-500"
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
            name="phone"
            type="tel"
            placeholder="Enter phone"
            icon={Phone}
            errors={errors}
            tooltipText=""
          />
          <TextInput
            label="Admission Date"
            register={register}
            name="dateOfAdmission"
            type="date"
            placeholder="dd-mm-yyyy"
            errors={errors}
            tooltipText=""
          />
          <FormSelectInput
            label="Class"
            name="class"
            options={classes}
            value={selectedClass}
            onChange={setSelectedClass}
            errors={errors}
            isSearchable={false}
            placeholder="Select class"
          />
          <FormSelectInput
            label="Section"
            name="section"
            options={sections}
            value={selectedSection}
            onChange={setSelectedSection}
            errors={errors}
            isSearchable={false}
            placeholder="Select section"
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
            name="dob"
            type="date"
            placeholder="dd-mm-yyyy"
            errors={errors}
            tooltipText=""
          />
          <TextInput
            label="Discount In Fee"
            register={register}
            name="discountInFee"
            type="number"
            placeholder="Discount in fee in %"
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
          <FormSelectInput
            label="Gender"
            name="gender"
            options={genders}
            value={selectedGender}
            onChange={setSelectedGender}
            errors={errors}
            isSearchable={false}
            href="/dashboard/student/newOption"
            placeholder="Select gender"
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
            label="Cast"
            register={register}
            name="cast"
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
            label="Desease if any"
            register={register}
            name="deseaseIfAny"
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
            label="Parent/Guardian Name"
            register={register}
            name="parentName"
            type="text"
            placeholder="Enter parent name"
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
            label="Address"
            register={register}
            name="address"
            type="text"
            placeholder="Enter address"
            errors={errors}
            tooltipText=""
          />
          <TextInput
            label="Address"
            register={register}
            name="address"
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
           <UploadStudentImageForm register={register} errors={errors} />
          
          {/* Submit */}
          {/* <SubmitButton
            loading={isLoading}
            className="col-span-2 mt-4"
            title="Save Student"
            showIcon={false}
          /> */}
        </form>
      </div>
    </div>
  );
}
