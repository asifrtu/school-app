import React from 'react'

type RadioOption = {
  label: string
  id: string
}
type RadioInputProps = {
  label: string
  name: string
  radioOptions: RadioOption[];
  register: any
  errors: any
}

export default function RadioInput({label, name, radioOptions, register, errors}: RadioInputProps) {
  return (
    <div className="grid gap-2">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{label}</label>
      {radioOptions.map((option) => (
        <div key={option.id} className="flex items-center space-x-2">
          <input
            id={option.id}
            type="radio"
            value={option.id}
            {...register(name)}
            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"            
          />
          <label htmlFor={option.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">            
            {option.label}
          </label>
        </div>
      ))}      
    </div>
  )
}   
