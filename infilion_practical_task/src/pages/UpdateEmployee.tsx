import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../features/employeesSlice"; // Create this action
import AddEditEmployee from "../components/AddEditEmployee";
import Layout from "../components/Layout";

const UpdateEmployee = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const employee = useSelector((state) =>
    state.employees.employees.find((emp) => emp.id === id)
  );

  useEffect(() => {
    if (!employee) {
      dispatch(fetchEmployees());
    }
  }, [dispatch, id, employee]);

  return (
    <Layout>
       <h2 className="text-center">Update Employee</h2>
      <Link to="/"> <button>&#x2190; Employee Listing</button></Link>

      {employee ? <AddEditEmployee employee={employee} /> : <p>Loading...</p>}
    </Layout>
  );
};

export default UpdateEmployee;
