import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Employee {
  id: number;
  name: string;
  position: string;
  age: number;
  salary: number;
  location: string;
}

interface EmployeesState {
  employees: Employee[];
  loading: boolean;
  error: string | null;
}

const initialState: EmployeesState = {
  employees: [],
  loading: false,
  error: null,
};

// Fetch all employees
export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async () => {
  const response = await fetch('/api/employees');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json(); // Adjusted to return JSON directly
});

// Create a new employee
export const createEmployee = createAsyncThunk('employees/createEmployee', async (newEmployee: Omit<Employee, 'id'>) => {
  const response = await fetch('/api/employees', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newEmployee),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json(); // Return the new employee
});

// Update an existing employee
export const updateEmployee = createAsyncThunk('employees/updateEmployee', async (employee: Employee) => {
  const response = await fetch(`/api/employees/${employee.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employee),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json(); // Return the updated employee
});

// Delete an employee
export const deleteEmployee = createAsyncThunk('employees/deleteEmployee', async (id: number) => {
  const response = await fetch(`/api/employees/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return id; // Return the ID of the deleted employee
});

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.employees = action.payload.employees; // Assuming action.payload is the array of employees
        state.loading = false;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch employees';
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload);
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to create employee';
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const index = state.employees.findIndex(emp => emp.id === action.payload.id);
        if (index !== -1) {
          console.log("101111111");
          state.employees[index] = action.payload; // Update the employee directly
        } else{
          console.log("10444444");
        }
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to update employee';
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter(emp => emp.id !== action.payload);
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to delete employee';
      });
  },
});

export const { actions, reducer } = employeesSlice;
export default reducer;
