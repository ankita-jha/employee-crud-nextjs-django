"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Employee } from "../types";
import { motion } from "framer-motion";
import { FiUserPlus, FiEdit2, FiTrash2, FiBriefcase, FiUsers, FiSearch, FiMenu } from "react-icons/fi";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function Home() {
  // State management for employees, loading state, search term, and mobile menu
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Function to fetch employees from the API
  const fetchEmployees = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/employees/`);
      const data = await res.json();
      setEmployees(data);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter employees based on search term
  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation bar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <FiUsers className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-2xl font-bold text-gray-800">EMS</span>
            </div>
            <div className="hidden md:flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search employees..."
                  className="w-64 px-4 py-2 text-gray-700 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FiSearch className="absolute right-3 top-3 text-gray-400" />
              </div>
            </div>
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
              >
                <FiMenu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <input
                type="text"
                placeholder="Search employees..."
                className="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        )}
      </nav>

      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Employee Management</h1>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Employee list header and add button */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Employee List</h2>
            <Link href="/create" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out">
              <FiUserPlus className="mr-2" />
              Add New Employee
            </Link>
          </div>

          {/* Loading spinner or employee list */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full"
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Map through filtered employees and render employee cards */}
              {filteredEmployees.map((employee) => (
                <motion.div
                  key={employee.id}
                  className="bg-white overflow-hidden shadow-sm rounded-lg hover:shadow-md transition duration-300 ease-in-out"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">{employee.name}</h3>
                    <div className="mt-2 max-w-xl text-sm text-gray-500">
                      <p className="flex items-center">
                        <FiBriefcase className="mr-2" />
                        {employee.position}
                      </p>
                      <p className="flex items-center mt-1">
                        <FiUsers className="mr-2" />
                        {employee.department.name}
                      </p>
                    </div>
                    <div className="mt-5 flex justify-end space-x-3">
                      <Link href={`/edit/${employee.id}`} className="text-indigo-600 hover:text-indigo-900 transition duration-150 ease-in-out">
                        <FiEdit2 className="h-5 w-5" />
                      </Link>
                      <Link href={`/delete/${employee.id}`} className="text-red-600 hover:text-red-900 transition duration-150 ease-in-out">
                        <FiTrash2 className="h-5 w-5" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}