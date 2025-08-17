"use client";

import React from "react";
import Select from "react-tailwindcss-select";
import { Controller, Control } from "react-hook-form";

type Option = {
  label: string;
  value: string;
};

type FormSelectInputProps = {
  name: string;
  label: string;
  options: Option[];
  control: Control<any>;
  errors?: any;
  placeholder?: string;
  isMulti?: boolean;
  isSearchable?: boolean;
  isClearable?: boolean;
  toolTipText?: string;
  href?: string;
};

interface ClassNames {
  menuButton?: (value?: { isDisabled?: boolean }) => string;
  menu?: string;
  tagItem?: (value?: { item?: Option; isDisabled?: boolean }) => string;
  tagItemText?: string;
  tagItemIconContainer?: string;
  tagItemIcon?: string;
  list?: string;
  listGroupLabel?: string;
  listItem?: (value?: { isSelected?: boolean }) => string;
  listDisabledItem?: string;
  ChevronIcon?: (value?: { open?: boolean }) => string;
  searchContainer?: string;
  searchBox?: string;
  searchIcon?: string;
  closeIcon?: string;
}

const classNames: ClassNames = {
  menuButton: (value) =>
    `w-full flex items-center justify-between px-3 rounded-md border ${
      value?.isDisabled
        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
        : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
    } focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400`,

  menu:
    "absolute mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10",

  tagItem: (value) =>
    `inline-flex items-center px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-sm mr-1 mb-1 ${
      value?.isDisabled
        ? "opacity-50 cursor-not-allowed"
        : "hover:bg-gray-300 dark:hover:bg-gray-600"
    }`,

  tagItemText: "mr-1 text-gray-900 dark:text-gray-100",

  tagItemIconContainer:
    "cursor-pointer text-gray-500 hover:text-red-500 dark:hover:text-red-400",

  tagItemIcon: "w-4 h-4",

  list: "max-h-60 overflow-y-auto text-sm list-none",

  listGroupLabel:
    "px-3 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase",

  listItem: (value) =>
    `px-3 py-2 cursor-pointer ${
      value?.isSelected
        ? "bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-gray-100"
        : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
    }`,

  listDisabledItem:
    "px-3 py-2 text-gray-400 dark:text-gray-500 cursor-not-allowed",

  ChevronIcon: (value) =>
    `w-4 h-4 transition-transform ${value?.open ? "rotate-180" : "rotate-0"}`,

  searchContainer: "px-3 py-2 bg-gray-50 dark:bg-gray-700",

  searchBox:
    "w-full px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-500",

  searchIcon: "absolute left-3 top-2.5 text-gray-400 w-4 h-4",

  closeIcon:
    "absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 w-4 h-4 cursor-pointer",
};

const FormSelectInput = ({
  name,
  label,
  options,
  control,
  errors,
  placeholder = "Select...",
  isMulti = false,
  isSearchable = true,
  isClearable = false,
  toolTipText,
  href,
}: FormSelectInputProps) => {
  return (
    <div className="grid gap-1 mb-4">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-800 dark:text-gray-300 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </label>

        {toolTipText && href && (
          <a
            href={href}
            className="text-xs text-gray-600 hover:underline"
            title={toolTipText}
          >
            {toolTipText}
          </a>
        )}
      </div>

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value, ref } }) => (
          <Select
            classNames={classNames}
            options={options}
            value={
              isMulti
                ? options.filter(option => value?.includes(option.value))
                : options.find(option => option.value === value) ?? null
            }
            onChange={(selected) => {
              if (Array.isArray(selected)) {
                onChange(selected.map((opt) => opt.value));
              } else {
                onChange(selected?.value ?? "");
              }
            }}
            isMultiple={isMulti}
            isSearchable={isSearchable}
            isClearable={isClearable}
            primaryColor="gray"
            placeholder={placeholder}
          />
        )}
      />

      {errors?.[name] && (
        <p className="mt-2 text-sm text-red-500">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default FormSelectInput;
