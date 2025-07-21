"use client";

import FilterDropdown from "@/components/molecules/FilterDropdown/FilterDropdown";
import StatusHeader from "@/components/molecules/StatusHeader/StatusHeader";
import {
  getPriorities,
  getDepartments,
  getStatuses,
  getEmployees,
} from "@/services/generalServices";
import { Employees, Departments, Priorities, Status } from "@/types/types";
import { useEffect, useState } from "react";

export default function Home() {
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [departments, setDepartments] = useState<Departments[]>([]);
  const [priorities, setPriorities] = useState<Priorities[]>([]);
  const [employees, setEmployees] = useState<Employees[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

  // Dropdown open states
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statusData = await getStatuses();
        const departmentsData = await getDepartments();
        const prioritiesData = await getPriorities();
        const employeesData = await getEmployees();

        setStatuses(statusData);
        setDepartments(departmentsData);
        setPriorities(prioritiesData);
        setEmployees(employeesData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDepartmentSelect = (departments: string[]) => {
    setSelectedDepartments(departments);
    console.log("Selected departments:", departments);
  };

  const handlePrioritiesSelect = (priorities: string[]) => {
    setSelectedPriorities(priorities);
    console.log("Selected priorities:", priorities);
  };

  const handleEmployeeSelect = (employees: string[]) => {
    setSelectedEmployees(employees);
    console.log("Selected employees:", employees);
  };

  const handleDropdownToggle = (dropdownId: string, isOpen: boolean) => {
    if (isOpen) {
      setOpenDropdown(dropdownId);
    } else {
      setOpenDropdown(null);
    }
  };

  return (
    <div>
      <div className="flex w-full flex-col gap-20 px-[120px]">
        <h1 className="text-c-grey mt-[38px] text-[34px] font-semibold">
          დავალების გვერდი
        </h1>

        <div className="flex w-[688px] justify-between gap-[45px] rounded-[10px] border-[1px] border-[#DEE2E6] px-4">
          <FilterDropdown
            onSelect={handleDepartmentSelect}
            selectedValues={selectedDepartments}
            placeholder="დეპარტამენტი"
            options={departments}
            isOpen={openDropdown === "departments"}
            onToggle={(isOpen) => handleDropdownToggle("departments", isOpen)}
          />
          <FilterDropdown
            onSelect={handlePrioritiesSelect}
            selectedValues={selectedPriorities}
            placeholder="პრიორიტეტი"
            options={priorities}
            isOpen={openDropdown === "priorities"}
            onToggle={(isOpen) => handleDropdownToggle("priorities", isOpen)}
          />
          <FilterDropdown
            onSelect={handleEmployeeSelect}
            selectedValues={selectedEmployees}
            placeholder="თანამშრომელი"
            options={employees}
            isOpen={openDropdown === "employees"}
            onToggle={(isOpen) => handleDropdownToggle("employees", isOpen)}
          />
        </div>

        <div className="flex w-full gap-[10px]">
          {statuses.map((status) => (
            <StatusHeader key={status.id} status={status} />
          ))}
        </div>
      </div>
    </div>
  );
}
