import apiClient from './api';

export const fetchEmployees = async () => {
  const response = await apiClient.get('/Employees');
  return response.data.results;
};

export const deleteEmployee = async (id: string) => {
  return await apiClient.delete(`/Employees/${id}`);
};

export const addEmployee = async (employeeData: Record<string, any>) => {
  return await apiClient.post('/Employees', employeeData);
};

export const updateEmployee = async (
  id: string,
  updatedData: Record<string, any>
) => {
  return await apiClient.put(`/Employees/${id}`, updatedData);
};
