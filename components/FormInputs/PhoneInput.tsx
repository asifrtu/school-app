import { cn } from '@/lib/utils';
import React from 'react';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { CircleHelp } from 'lucide-react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  register: any;
  errors: any;
  tooltipText: string;
  unit?: string;
  label: string;
  type?: string;
  name: string;
  placeholder: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const TextInput: React.FC<TextInputProps> = ({
  tooltipText,
  unit,
  label,
  type = 'text',
  name,
  placeholder,
  register,
  errors,
  required,
  icon: Icon,
}) => {
  return (
    <div className="grid gap-2">
      <label
        htmlFor={name}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon
            className="size-4 absolute left-3 top-1/3 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
        )}
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          {...register(name, { required })}
          className={cn(
            'block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
            Icon && 'pl-10',
            errors[name] && 'border-red-500 focus:border-red-500 focus:ring-red-500'
          )}
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltipText}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {unit && <span className="absolute right-3 top-1/2 -translate-y-1/2">{unit}</span>}
      {errors[name] && <p className="mt-2 text-sm text-red-500">{errors[name].message}</p>}
    </div>
  );
};

export default TextInput;
