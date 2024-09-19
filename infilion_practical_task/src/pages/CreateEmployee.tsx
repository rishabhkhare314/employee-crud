import { Link } from "react-router-dom";
import AddEditEmployee from "../components/AddEditEmployee";
import Layout from "../components/Layout";

const CreateEmployee = () => {
  return (
    <Layout>
      <h2 className="text-center">Create Employee </h2>
      <Link to="/"> <button>&#x2190; Employee Listing</button></Link>
      <AddEditEmployee />
    </Layout>
  );
};

export default CreateEmployee;
