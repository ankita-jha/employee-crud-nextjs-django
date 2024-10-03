// types.ts
export interface Department {
  id: number;
  name: string;
}

export interface Employee {
  id: number;
  name: string;
  position: string;
  department: Department;
}
  