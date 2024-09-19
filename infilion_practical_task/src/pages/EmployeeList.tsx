import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmployee, fetchEmployees } from "./../features/employeesSlice";
import { RootState } from "../shared/store";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

const EmployeeList = () => {
  const dispatch = useDispatch();
  const employees = useSelector(
    (state: RootState) => state.employees.employees
  );
  const loading = useSelector((state: RootState) => state.employees.loading);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleEmployeeUpdate = (employeeId: number) => {
    console.log("Action for employee ID:", employeeId);
    // Replace with desired action (e.g., edit or delete)
  };

  const handleEmployeeDelete = (employeeId: number) => {
    console.log("Action for employee ID:", employeeId);
    if (window.confirm("Are you sure you want to delete this employee?")) {
      dispatch(deleteEmployee(employeeId));
    }
    // Replace with desired action (e.g., edit or delete)
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Layout>
      <h1 className="text-2xl mb-4">Employee List</h1>
      <div className="flex justify-end w-full mb-4">
        <Link to="create-employee">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Create Customer
        </button>
        </Link>

      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border border-gray-300 text-left">ID</th>
              <th className="p-2 border border-gray-300 text-left">Name</th>
              <th className="p-2 border border-gray-300 text-left">Designation</th>
              <th className="p-2 border border-gray-300 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-100">
                <td className="p-2 border border-gray-300">{employee.id}</td>
                <td className="p-2 border border-gray-300">{employee.name}</td>
                <td className="p-2 border border-gray-300">{employee.position}</td>
                <td className="p-2 border border-gray-300">
                  <Link to={`employee/${employee.id}`} >
                <button
                      onClick={() => handleEmployeeUpdate(employee.id)}
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                    </Link>
                    <button
                      onClick={() => handleEmployeeDelete(employee.id)}
                      className="text-blue-500 hover:underline ml-4"
                    >
                      Delete
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default EmployeeList;
