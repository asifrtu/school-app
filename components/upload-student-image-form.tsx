import React, { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { 
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent, 
} from "./ui/card";


type Props = {
  register: UseFormRegister<any>; // Adjust based on form type if needed
  errors: FieldErrors<any>;
  name?: string;
};

export default function UploadStudentImageForm({ register,name, errors }: Props) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <Card className="w-full bg-white dark:bg-black text-black dark:text-white border border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle>Upload Student Image</CardTitle>
        <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
          Select and preview the student's image.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <input
          id="image"
          type="file"
          accept="image/*"
          {...register("studentImage", {
            required: "Student image is required",
            onChange: handleImageChange,
          })}
          className="block w-full text-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-md file:bg-blue-600 file:text-white hover:file:bg-blue-700"
        />

        {errors.image?.message && (
          <span className="text-sm text-red-500">{String(errors.image.message)}</span>
        )}

        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Preview"
            className="h-40 w-full object-cover rounded-md border border-gray-300 dark:border-gray-600"
          />
        ) : (
          <div className="h-40 w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md text-gray-400 text-sm">
            No image selected
          </div>
        )}
      </CardContent>
    </Card>
  );
}
