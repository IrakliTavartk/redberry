import { ReactNode } from "react";
import { Departments, EmployeeData, Priorities, Status } from "./types";

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

export interface EmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (employeeData: EmployeeData) => void;
}

export interface LabelProps {
  title: string;
  htmlFor: string;
  isRequired?: boolean;
}


export interface CircleAvatarProps {
  photoSrc: string;
  size?: number;
  onRemove?: () => void;
}


