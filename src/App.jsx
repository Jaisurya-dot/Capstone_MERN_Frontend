import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './Layout/adminlayout';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import Statistics from './pages/admin/Statistics';
import CreateCourse from './pages/admin/CreateCourse';
import AccessUser from './pages/admin/AccessUser';
import CoursePreview from './pages/admin/CoursePreview';

// Student Pages
import WatchCourse from './pages/student/WatchCourse';

/**
 * Main Application Component.
 * Defines the routing structure using React Router.
 * Wraps admin-related pages in a DashboardLayout for consistent navigation.
 */
function App() {
    return (
        <Routes>
            {/* Root Redirect: Automatically send users to the dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* Dashboard Routes with Shared Layout */}
            <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="statistics" element={<Statistics />} />
                <Route path="create-course" element={<CreateCourse />} />
                <Route path="create-course/:courseId" element={<CreateCourse />} />
                <Route path="preview-course/:courseId" element={<CoursePreview />} />
                <Route path="watch/:courseId/:lessonId?" element={<WatchCourse />} />
                <Route path="access-user" element={<AccessUser />} />
            </Route>

            {/* Fallback for 404 - Not Found (Optional) */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
    );
}

export default App;