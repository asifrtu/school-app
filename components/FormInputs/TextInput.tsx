import { cn } from "@/lib/utils";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { CircleHelp } from "lucide-react";
import { Control, Controller } from "react-hook-form";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  control: Control<any>; // from react-hook-form
  errors: any;
  tooltipText: string;
  unit?: string;
  label: string;
  name: string;
  placeholder: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  required?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  tooltipText,
  unit,
  label,
  type = "text",
  name,
  placeholder,
  control,
  errors,
  required,
  icon: Icon,
}) => {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1">
        <label
          htmlFor={name}
          className="text-sm font-medium text-gray-800 dark:text-gray-300"
        >
          {label}
        </label>

        {tooltipText && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <CircleHelp className="w-4 h-4 text-gray-400 cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">{tooltipText}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      <Controller
        name={name}
        control={control}
        rules={{ required }}
        defaultValue=""
        render={({ field }) => (
          <div className="relative">
            {Icon && (
              <Icon
                className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                aria-hidden="true"
              />
            )}

            <input
              {...field}
              id={name}
              type={type}
              placeholder={placeholder}
              className={cn(
                "block w-full rounded-md border px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400",
                Icon && "pl-10",
                unit && "pr-12",
                errors[name] && "border-gray-500 focus:ring-gray-500"
              )}
            />

            {unit && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 dark:text-gray-400">
                {unit}
              </span>
            )}
          </div>
        )}
      />

      {errors[name] && (
        <p className="mt-1 text-sm text-gray-600">{errors[name]?.message}</p>
      )}
    </div>
  );
};

export default TextInput;
