import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import DashboardLayout from './Layout/adminlayout';

import Dashboard from './pages/admin/Dashboard';
import Statistics from './pages/admin/Statistics';
import CreateCourse from './pages/admin/CreateCourse';
import AccessUser from './pages/admin/AccessUser';

// ✅ Proper Navigation Component
const Navi = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 1000);

    return () => clearTimeout(timer); // cleanup
  }, [navigate]);

  return <h1>Hello</h1>;
};

function App() {
  return (
    <Routes>
      {/* Redirect Page */}
      <Route path="/" element={<Navi />} />

      {/* Dashboard Layout */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="statistics" element={<Statistics />} />
        <Route path="create-course" element={<CreateCourse />} />
        <Route path="access-user" element={<AccessUser />} />
      </Route>
    </Routes>
  );
}

export default App;