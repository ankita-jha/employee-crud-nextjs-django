"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface Employee {
  id: number;
  name: string;
  position: string;
  department: {
    id: number;
    name: string;
  };
}

export default function DeleteEmployee() {
  const { id } = useParams();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  const fetchEmployee = async () => {
    try {
      const res = await fetch(`${API_URL}/api/employees/${id}/`);
      if (!res.ok) {
        throw new Error("Failed to fetch employee");
      }
      const data = await res.json();
      setEmployee(data);
    } catch (error) {
      console.error("Error fetching employee:", error);
      setError("Error fetching employee");
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`${API_URL}/api/employees/${id}/`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete employee");
      }
      router.push("/");
    } catch (error) {
      console.error("Error deleting employee:", error);
      setError("Error deleting employee");
    }
  };

  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;
  if (!employee) return <div className="text-center mt-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Delete Employee</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <p className="mb-4 text-center">Are you sure you want to delete {employee.name}?</p>
          <div className="flex justify-between">
            <button
              onClick={handleDelete}
              className="w-5/12 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Confirm Delete
            </button>
            <Link
              href="/"
              className="w-5/12 flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}