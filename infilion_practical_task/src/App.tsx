import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { makeServer } from "./server";

import EmployeeList from "./pages/EmployeeList";
import UpdateEmployee from "./pages/UpdateEmployee";
import CreateEmployee from "./pages/CreateEmployee";

makeServer();

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <h1>Not Found</h1>,
      children: [
        {
          path: "",
          element: <EmployeeList />,
        },
        {
          path: "create-employee",
          element: <CreateEmployee />,
        },
        {
          path: "employee/:id",
          element: <UpdateEmployee />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
