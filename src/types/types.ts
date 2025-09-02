export interface Status {
  id: number;
  name: string;
}
export interface Departments {
  id: number;
  name: string;
}

export interface Priorities {
  id: number;
  name: string;
  icon: string;
}

export interface Employees {
  id: number;
  name: string;
  surname: string;
  avatar: string;
  department_id: number;
}

export type EmployeeData = {
  name: string;
  email: string;
  position: string;
  avatar: File | null;
};

export type EmployeeFormInputTypes = {
  name: string;
  lastname: string;
  department: string;
  avatar: File;
  employee: string;
};


