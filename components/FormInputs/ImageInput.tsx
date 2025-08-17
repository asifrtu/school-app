import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import type { Dispatch, SetStateAction } from "react";
import { UploadButton } from "@/lib/uploadthing";
import { OurFileRouter } from "@/app/api/uploadthing/core";

type ImageInputProps = {
  title: string;
  imageUrl: string;
  setImageUrl: Dispatch<SetStateAction<string>>;
  endPoint: string;
};

const ImageInput = ({
  title,
  imageUrl,
  setImageUrl,
  endPoint,
}: ImageInputProps) => {
  return (
    <Card className="w-full bg-white dark:bg-black text-black dark:text-white border border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
          Upload your image
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            width={300}
            height={300}
            className="h-40 w-full object-cover rounded-md border border-gray-300 dark:border-gray-600"
          />
        ) : (
          <div className="h-40 w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md text-gray-400 text-sm">
            No image selected
          </div>
        )}

        <UploadButton
          endpoint={endPoint as keyof OurFileRouter}
          onClientUploadComplete={(res) => {
            console.log("UploadThing response:", res);

            if (res && res.length > 0) {
            const fileUrl = res[0].url; // handle both `url` and `fileUrl`
            if (fileUrl) {
            setImageUrl(fileUrl);
            } else {
            console.warn("No file URL found in response:", res[0]);
            }
            }
          }}
          onUploadError={(error: Error) => {
            console.error("Upload failed:", error);
          }}
          className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-md px-4 py-2"
        />

      </CardContent>
    </Card>
  );
};

export default ImageInput;
