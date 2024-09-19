import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createEmployee, updateEmployee } from '../features/employeesSlice';
import { Link, useNavigate } from 'react-router-dom';

interface Employee {
  id?: number; 
  name: string;
  position: string;
}

interface AddEditEmployeeProps {
  employee?: Employee;
}

const AddEditEmployee: React.FC<AddEditEmployeeProps> = ({ employee }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Employee>({
    name: employee ? employee.name : '',
    position: employee ? employee.position : '',
  });

  useEffect(() => {
    if (employee) {
      setFormData({ name: employee.name, position: employee.position });
    }
  }, [employee]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(employee) {
      dispatch(updateEmployee({ id: employee.id, ...formData }));

    }else {
    // Dispatch create action with form data
    dispatch(createEmployee(formData));
  }
    navigate('/');
  };

  return (
    <div className="flex justify-center items-center min-h-screen">     
      <form
        onSubmit={handleSubmit}
        className="space-y-6 max-w-md w-full p-6 bg-white border border-gray-300 rounded-md shadow-md"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="position">
            Position
          </label>
          <input
            id="position"
            name="position"
            type="text"
            placeholder="Enter position"
            value={formData.position}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddEditEmployee;
