"use client";

import React from "react";
import Label from "../CustomForm/Label";
import { useState, useEffect } from "react";
import { Departments, Employees,} from "@/types/types";
import FilterDropdown from "@/components/molecules/FilterDropdown/FilterDropdown";
import { useForm } from "react-hook-form";
import {
  getDepartments,
  getEmployees,
 
} from "@/services/generalServices";
import CustomButton from "@/components/atoms/Button/CustomButton";

interface EmployeeFormInputTypes {
  department: string;
  title: string;
  description: string;
  employee: string;
  prioritie: string;
}

const CreateEmployee = () => {
  const [departments, setDepartments] = useState<Departments[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [employees, setEmployees] = useState<Employees[]>([]);
 
  const {
    register,
    formState: { errors },
    setValue,
  } = useForm<EmployeeFormInputTypes>();

  useEffect(() => {
    const loadDepartments = async () => {
      try {
        const departmentData = await getDepartments();
        const employeesData = await getEmployees();

        setDepartments(departmentData);
        setEmployees(employeesData);

      } catch (error) {
        console.error("Failed to load departments:", error);
      }
    };

    loadDepartments();
  }, []);

  const handleEmployeeSelect = (employees: string[]) => {
    console.log("Selected employees:", employees);
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

   

  return (
    <div>
      <h1 className="text-c-grey mt-[38px] pt-7.5 pl-30 text-[34px] font-semibold">
        შექმენი ახალი დავალება
      </h1>

      <div className="mr-30 ml-30 rounded-sm border-[0.3px] border-[#DDD2FF] bg-[#FBF9FFA6] p-4">
        <div className="flex gap-5 pl-6">
          <div>
            <Label title="სათაური" htmlFor="title" isRequired />
            <input
              type="text"
              id="title"
              className="text-c-grey placeholder:text-c-grey w-[550px] rounded-md border border-[#CED4DA] bg-white px-[8px] py-[16px]"
              {...register("title", {
                required: "სახელის შეყვანა აუცილებელია",
                minLength: { value: 2, message: "მინიმუმ 2 სიმბოლო" },
                maxLength: { value: 255, message: "მაქსიმუმ 255 სიმบოლო" },
              })}
              onInput={(e) => {
                const sanitizedValue = e.currentTarget.value.replace(
                  /[^a-zA-Zა-ჰ\s]/g,
                  "",
                );
                setValue("title", sanitizedValue);
              }}
            />
            {errors.title && (
              <span className="text-[11px] text-red-700">
                {errors.title.message}
              </span>
            )}
          </div>

          <div className="ml-22 flex flex-col">
            <Label title="დეპარტამენტი" htmlFor="department" isRequired />
            <div className="w-[550px] rounded-md border border-[#CED4DA] px-2">
              <FilterDropdown
                onSelect={handleDepartmentSelect}
                selectedValues={selectedDepartments}
                placeholder="აირჩიეთ დეპარტამენტი"
                options={departments}
                isOpen={openDropdown === "departments"}
                onToggle={(isOpen) =>
                  setOpenDropdown(isOpen ? "departments" : null)
                }
              />
            </div>
          </div>
        </div>

        <div>
          <div className="mt-18 ml-6 flex gap-[110px]">
            <div>
              <Label title="აღწერა" htmlFor="description" isRequired />
              <input
                type="text"
                id="description"
                className="text-c-grey placeholder:text-c-grey h-[120px] w-[550px] rounded-md border border-[#CED4DA] bg-white px-[8px] py-[2px]"
              />
            </div>

            <div>
              <Label
                title="პასუხისმგებელი თანამშრომელი"
                htmlFor="employee"
                isRequired
              />
              <div className="w-[550px] rounded-md border border-[#CED4DA] px-2">
                <FilterDropdown
                  onSelect={handleEmployeeSelect}
                  selectedValues={[]}
                  placeholder="აირჩიეთ თანამშრომელი"
                  options={employees}
                  isOpen={openDropdown === "employees"}
                  onToggle={(isOpen) =>
                    setOpenDropdown(isOpen ? "employees" : null)
                  }
                />
              </div>
            </div>
          </div>
        </div>
       <div className="pl-250" >
                 

          <CustomButton type="submit" filled className="w-[240px] self-end rounded-[5px]">
            დაამატე თანამშრომელი
          </CustomButton>
       

       </div>
      </div>
    </div>
  );
};

export default CreateEmployee;
