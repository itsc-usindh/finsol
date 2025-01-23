import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DashboardLayout from "./Layout/dashboardLayout";
import { useState } from "react";
import Login from "./Screens/login";
import Dashboard from "./Screens/dashboard";
import ListBudget from "./Screens/budget/listBudget";
import AddBudget from "./Screens/budget/addBudget";
import ListEmployee from "./Screens/employees/listEmployee";
import AddEmployee from "./Screens/employees/addEmployee";
import Campus from "./Screens/Campus";
import Faculty from "./Screens/Faculty";
import Department from "./Screens/Department";
import Section from "./Screens/Section";
import EditEmployee from "./Screens/employees/editEmployee";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Router>
      {(isLoggedIn || window.localStorage.login) ? 
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/listCampus" element={<Campus />} />
          <Route path="/listFaculty" element={<Faculty />} />
          <Route path="/listDepartment" element={<Department />} />
          <Route path="/listSection" element={<Section />} />
          <Route path="/listBudget" element={<ListBudget />} />
          <Route path="/addBudget" element={<AddBudget />} />
          <Route path="/listEmployee" element={<ListEmployee />} />
          <Route path="/addEmployee" element={<AddEmployee />} />
          <Route path="/editEmployee" element={<EditEmployee/>} />
        </Routes>
      </DashboardLayout> :

        <Routes>
          <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>}
    </Router>
  );
}

export default App;
