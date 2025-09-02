"use client";

import { useForm } from "react-hook-form";
import Label from "./Label";
import CircleAvatar from "@/components/atoms/CircleAvatar/CircleAvatar";
import Image from "next/image";
import { useState, useEffect } from "react";
import FilterDropdown from "@/components/molecules/FilterDropdown/FilterDropdown";
import { Departments } from "@/types/types";

import { getDepartments } from "@/services/generalServices";

import { EmployeeFormInputTypes } from "@/types/types";

const CustomForm = ({onClose}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [departments, setDepartments] = useState<Departments[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<EmployeeFormInputTypes>();

  // Load departments on component mount
  useEffect(() => {
    const loadDepartments = async () => {
      try {
        const departmentData = await getDepartments();
        setDepartments(departmentData);
      } catch (error) {
        console.error("Failed to load departments:", error);
      }
    };

    loadDepartments();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
      setValue("avatar", file, { shouldValidate: true });
    }
  };

  const handleDepartmentSelect = (selectedOptions: string[]) => {
    setSelectedDepartments(selectedOptions);
    // If single selection, set the form value
    if (selectedOptions.length > 0) {
      setValue("department", selectedOptions[0], { shouldValidate: true });
    } else {
      setValue("department", "", { shouldValidate: true });
    }
  };

  const handleDropdownToggle = (dropdownName: string, isOpen: boolean) => {
    setOpenDropdown(isOpen ? dropdownName : null);
  };

  const onSubmit = (data: EmployeeFormInputTypes) => {
    console.log("Form submitted with data:", data);
  };

  const handleCancel = (showConfirmation: boolean = false) => {
    if (showConfirmation) {
      const confirmed = window.confirm("ნამდვილად გსურთ ფორმის გაუქმება?");
      if (!confirmed) return;
      
    }

    // Reset form fields
    reset();

    // Clear preview image
    setPreview(null);

    // Clear selected departments
    setSelectedDepartments([]);

    // Close any open dropdowns
    setOpenDropdown(null);

    // Clear file input manually if needed
    const fileInput = document.getElementById("photo") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }

    console.log("Form has been reset");
  };

  return (
    <form
      className="flex h-full flex-col justify-between gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex gap-[45px]">
        {/* Name */}
        <div className="flex flex-1 flex-col gap-1">
          <Label title="სახელი" htmlFor="name" isRequired />

          <input
            type="text"
            id="name"
            {...register("name", {
              required: "სახელის შეყვანა აუცილებელია",
              minLength: { value: 2, message: "მინიმუმ 2 სიმბოლო" },
              maxLength: { value: 255, message: "მაქსიმუმ 255 სიმบოლო" },
            })}
            onInput={(e) => {
              const sanitizedValue = e.currentTarget.value.replace(
                /[^a-zA-Zა-ჰ\s]/g,
                "",
              );
              setValue("name", sanitizedValue);
            }}
            className="h-[45px] rounded-md border border-[#CED4DA] p-2.5"
          />
          {errors.name && (
            <span className="text-[11px] text-red-700">
              {errors.name.message}
            </span>
          )}
        </div>

        {/* Last Name */}
        <div className="flex flex-1 flex-col gap-1 pr-2">
          <Label title="გვარი" htmlFor="lastname" isRequired />
          <input
            type="text"
            id="lastname"
            {...register("lastname", {
              required: "გვარის შეყვანა აუცილებელია",
              minLength: { value: 2, message: "მინიმუმ 2 სიმბოლო" },
              maxLength: { value: 255, message: "მაქსიმუმ 255 სიმბოლო" },
            })}
            onInput={(e) => {
              const sanitizedValue = e.currentTarget.value.replace(
                /[^a-zA-Zა-ჰ\s]/g,
                "",
              );
              setValue("lastname", sanitizedValue, { shouldValidate: true });
            }}
            className="h-[45px] rounded-md border border-[#CED4DA] p-2.5"
          />
          {errors.lastname && (
            <span className="text-[11px] text-red-700">
              {errors.lastname.message}
            </span>
          )}
        </div>
      </div>

      {/* Avatar Upload */}
      <div>
        <Label title="ფოტო" htmlFor="photo" isRequired />
        <div className="flex h-[120px] flex-col items-center justify-center rounded-lg border border-dashed border-[#CED4DA]">
          {preview ? (
            <div className="relative">
              <CircleAvatar photoSrc={preview} />
              <button
                type="button"
                onClick={() => {
                  setPreview(null);
                  setValue("avatar", null);
                }}
                className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white"
              >
                ×
              </button>
            </div>
          ) : (
            <label htmlFor="photo" className="cursor-pointer">
              <Image
                src="/svgs/uploadPhoto.svg"
                alt="upload"
                width={136}
                height={50}
              />
            </label>
          )}
          <input
            type="file"
            id="photo"
            accept="image/*"
            className="hidden"
            {...register("avatar", {
              required: "სურათის ატვირთვა აუცილებელია",
              validate: {
                isImage: (file) => {
                  if (!file) return "სურათის ატვირთვა აუცილებელია";
                  const validTypes = [
                    "image/jpeg",
                    "image/jpg",
                    "image/png",
                    "image/gif",
                    "image/webp",
                  ];
                  if (!validTypes.includes(file.type)) {
                    return "გთხოვთ ატვირთოთ სწორი ფორმატის სურათი";
                  }
                  if (file.size > 5 * 1024 * 1024) {
                    // 5MB limit
                    return "სურათის ზომა არ უნდა აღემატებოდეს 5MB-ს";
                  }
                  return true;
                },
              },
            })}
            onChange={handleFileChange}
          />
        </div>
        {errors.avatar && (
          <span className="text-[11px] text-red-700">
            {errors.avatar.message}
          </span>
        )}
      </div>

      {/* Department Selection */}
      <div className="relative flex flex-col gap-1">
        <Label title="დეპარტამენტი" htmlFor="department" isRequired />
        <div className="rounded-md border border-[#CED4DA] pl-85">
          <FilterDropdown
            onSelect={handleDepartmentSelect}
            selectedValues={selectedDepartments}
            placeholder=""
            options={departments}
            isOpen={openDropdown === "departments"}
            onToggle={(isOpen) => handleDropdownToggle("departments", isOpen)}
          />
        </div>

        {/* Hidden input for form validation */}
        <input
          type="hidden"
          {...register("department", {
            required: "დეპარტამენტის არჩევა აუცილებელია",
          })}
        />

        {errors.department && (
          <span className="text-[11px] text-red-700">
            {errors.department.message}
          </span>
        )}
      </div>

      <div className="flex gap-5 pl-9">
        <button
          type="button"
          onClick={() => handleCancel(false)}
          className="mt-6 cursor-pointer rounded-md border border-[#8338EC] bg-[#fff] px-4 py-2 text-[#8338EC] transition-colors hover:bg-[#8338EC] hover:text-white"
        >
          გაუქმება
        </button>
        <button
          type="submit"
          className="mt-6 rounded-md bg-[#8338EC] px-4 py-2 text-white transition-colors hover:bg-[#6B2AB8]"
        >
          თანამშრომლის დამატება
        </button>
      </div>
    </form>
  );
};

export default CustomForm;
