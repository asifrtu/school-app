"use client";

import { UploadButton } from "@/lib/uploadthing"; // path depends on your project
import { useState } from "react";

export default function UploaderComponent() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);

  return (
    <div>
      <UploadButton
        endpoint="imageUploader" // must match the slug defined in server config
        onClientUploadComplete={(res) => {
          if (!res || res.length === 0) return;
          console.log("Upload response:", res);
          setUploadedImage(res[0].url); // preview
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
  );
}
