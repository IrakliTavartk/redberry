import { apiClient } from './apiClients';


export interface Status {
  id: number;
  name: string;

}

export interface StatusResponse {
  data: Status[];
  message?: string;
  success: boolean;
}


export const fetchStatuses = async (): Promise<StatusResponse> => {
  try {
    const response = await apiClient.get('/statuses');
    return response.data;
  } catch (error) {
    console.error('Error fetching statuses:', error);
    throw error;
  }
};


export const createStatus = async (statusData: Omit<Status, 'id'>): Promise<Status> => {
  try {
    const response = await apiClient.post('/statuses', statusData);
    return response.data;
  } catch (error) {
    console.error('Error creating status:', error);
    throw error;
  }
};

export const updateStatus = async (id: number, statusData: Partial<Status>): Promise<Status> => {
  try {
    const response = await apiClient.put(`/statuses/${id}`, statusData);
    return response.data;
  } catch (error) {
    console.error('Error updating status:', error);
    throw error;
  }
};


export const deleteStatus = async (id: number): Promise<void> => {
  try {
    await apiClient.delete(`/statuses/${id}`);
  } catch (error) {
    console.error('Error deleting status:', error);
    throw error;
  }
};