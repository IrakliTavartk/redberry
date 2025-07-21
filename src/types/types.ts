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

export interface EmployeeData {
  name: string;
  email: string;
  avatar: string;
  department: string;
}
