"use client";
import { useEffect, useRef } from "react";
import DropdownIcon from "../../../../public/svgs/svgComponents/DropdownIcon";
import { FilterDropdownProps } from "@/types/propTypes";

const FilterDropdown = ({
  onSelect,
  selectedValues,
  placeholder,
  options,
  isOpen,
  onToggle,
}: FilterDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onToggle(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onToggle]);

  const handleToggle = () => {
    onToggle(!isOpen);
  };

  const handleCheckboxChange = (option: string) => {
    let updatedSelection: string[];

    if (selectedValues.includes(option)) {
      // Remove option if already selected
      updatedSelection = selectedValues.filter(
        (item: string) => item !== option,
      );
    } else {
      // Add option if not selected
      updatedSelection = [...selectedValues, option];
    }

    onSelect(updatedSelection);
  };

  const getDisplayText = () => {
    return placeholder;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown trigger */}
      <div className="cursor-pointer" onClick={handleToggle}>
        <div className="group hover:text-c-purple flex cursor-pointer gap-4">
          <span className="item-center flex items-center px-[8px] py-[16px] text-[16px] text-[#0D0F10] hover:text-purple-500">
            {getDisplayText()}
            <div className="">
              <DropdownIcon />
            </div>
          </span>
        </div>
      </div>

      {/* Dropdown menu - positioned absolutely to not affect parent size */}
      {isOpen && (
        <div className="absolute top-full left-0 z-50 mt-2 min-w-[500px] rounded-md border border-gray-200 bg-white shadow-lg">
          {options.map((option) => (
            <div
              key={option.id}
              className="flex cursor-pointer items-center gap-3 px-4 py-3 text-black hover:bg-gray-50"
              onClick={() => handleCheckboxChange(option.name)}
            >
              <div className="relative">
                <input
                  type="checkbox"
                  checked={selectedValues.includes(option.name)}
                  onChange={() => handleCheckboxChange(option.name)}
                  className="sr-only" 
                />
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded border-2 ${
                    selectedValues.includes(option.name)
                      ? "border-purple-500 bg-purple-500"
                      : "border-gray-300"
                  }`}
                >
                  {selectedValues.includes(option.name) && (
                    <svg
                      className="h-3 w-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </div>

              <span className="select-none">{option.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
