"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Control, Controller } from "react-hook-form";

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  tooltipText?: string;
  control: Control<any>;
  errors: any;
  placeholder?: string;
  type?: string;
  forgetPasswordLink?: string;
  required?: boolean;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export default function PasswordInput({
  label,
  name,
  control,
  errors,
  placeholder,
  type = "password",
  required,
  forgetPasswordLink,
  icon: Icon,
  disabled,
}: TextInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="grid gap-1 mb-4">
      <label
        htmlFor={name}
        className="text-sm font-medium text-gray-800 dark:text-gray-300 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
      <Controller
      name={name}
      control={control}
      rules={{ required }}
      defaultValue=""
      render={({ field }) => (
        
      
      <div className="relative">
        {Icon && (
          <Icon
            className="size-4 absolute left-3 top-1/3 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
        )}
        <input
          id={name}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          {...field}
          disabled={disabled}
          className={cn(
                      'block w-full rounded-md border border-gray-300 px-3 py-1.5 border-gray-10 dark:border-gray-800 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-500 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none hover:bg-white dark:hover:bg-gray-800 focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700',
                      Icon && 'pl-10',
                      errors[name] && 'border-gray-500 focus:border-gray-500 focus:ring-gray-500'
                    )}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute inset-y-0 right-0 flex items-center pr-3 pb-4"
          aria-label={showPassword ? "Hide password" : "Show password"}
          disabled={disabled}
        >
          {showPassword ? (
            <Eye className="h-4 w-4 text-gray-400" aria-hidden="true" />
          ) : (
            <EyeOff className="h-4 w-4 text-gray-400" aria-hidden="true" />
          )}
        </button>
      </div>

      )}
      />
      {forgetPasswordLink && (
        <div className="mt-2 text-sm">
          <a href={forgetPasswordLink} className="text-gray-600 hover:underline">
            Forgot Password?
          </a>
        </div>
      )}
      {errors[name] && (
        <p className="mt-1 text-sm text-gray-600">{errors[name].message}</p>
      )}
    </div>
  );
}
