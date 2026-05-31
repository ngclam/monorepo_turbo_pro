import axios from "axios";

export const axiosInstance = axios.create({
  // Backend PHP mẫu chạy bằng XAMPP.
  baseURL: "http://localhost/core-api",
  timeout: 8000,
  headers: {
    "Content-Type": "application/json"
  }
});

export async function GET<T>(url: string): Promise<T> {
  const response = await axiosInstance.get<T>(url);
  return response.data;
}

export async function POST<T, B = unknown>(url: string, body: B): Promise<T> {
  const response = await axiosInstance.post<T>(url, body);
  return response.data;
}

export async function PUT<T, B = unknown>(url: string, body: B): Promise<T> {
  const response = await axiosInstance.put<T>(url, body);
  return response.data;
}

export async function DELETE<T>(url: string): Promise<T> {
  const response = await axiosInstance.delete<T>(url);
  return response.data;
}
