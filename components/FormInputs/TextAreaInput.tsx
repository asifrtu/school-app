import { cn } from '@/lib/utils'
import React from 'react'
import { Control, Controller } from 'react-hook-form'

type TextAreaProps = {
  control: Control<any>; // from react-hook-form
  errors: any
  name: string
  label: string;
  helperText?: string;
  placeholder?: string;
  className?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  isReadOnly?: boolean;
  isAutofocus?: boolean;
  required?: boolean;
}

export default function TextAreaInput({ control, required, errors, name, label, helperText, placeholder, className, isDisabled, isRequired, isReadOnly, isAutofocus }: TextAreaProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-800 dark:text-gray-300">{label}</label>
      <Controller
        name={name}
        control={control}
        rules={{ required }}
        defaultValue=""
        render={({ field }) => (
      <div className="mt-2">
        <textarea
          {...field}
          id={name}
          rows={4}
          className={cn(className)}
          placeholder={placeholder}
          disabled={isDisabled}
          readOnly={isReadOnly}
          autoFocus={isAutofocus}
        />
      </div>

      )}
      />
      {helperText && <p className="mt-2 text-sm text-gray-500">{helperText}</p>}
      {errors[name] && <p className="mt-2 text-sm text-red-500">{errors[name].message}</p>}
    </div>
  )
}