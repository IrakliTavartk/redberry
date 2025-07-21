import { ReactNode } from "react";
import { Departments, Priorities, Status } from "./types";

export interface CustomButtonProps {
  filled?: boolean;
  className?: string;
  children: ReactNode;
   onClick?: () => void; 
}

export interface StatusHeaderProps {
  status: Status;
}

export interface FilterDropdownProps {
  onSelect: (values: string[]) => void;
  selectedValues: string[];
  placeholder: string;
  options: Departments[] | Priorities[];
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
}