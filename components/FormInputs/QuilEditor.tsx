"use client";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function QuilEditor({
  label,
  className = "sm:col-span-2",
  value,
  onChange,
}: {
  label: string;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;   
  
}) {
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };    

  return (
    <div className={className}>
      <label className="block text-sm font-medium leading-6 text-gray-900"> {label}</label>
      <ReactQuill
        theme="snow"        
        value={value}
        onChange={onChange}
        modules={modules}
      />
    </div>
  );  
  }
