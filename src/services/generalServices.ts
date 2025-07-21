import { Employees, Priorities, Departments, Status } from "@/types/types";
import api from "./apiClient";

export const getStatuses = async (): Promise<Status[]> => {
  try {
    const response = await api.get<Status[]>("/statuses");
    return response.data;
  } catch (error) {
    console.error("Error fetching statuses:", error);
    throw error;
  }
};

export const getDepartments = async (): Promise<Departments[]> => {
  try {
    const response = await api.get<Departments[]>("/departments");
    return response.data;
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw error;
  }
};


export const getPriorities = async (): Promise<Priorities[]> => {
  try {
    const response = await api.get<Priorities[]>("/priorities");
    return response.data;
  } catch (error) {
    console.error("Error fetching priorities:", error);
    throw error;
  }
};

export const getEmployees = async (): Promise<Employees[]> => {
  try {
    const response = await api.get<Employees[]>("/employees");
    return response.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};