import React from 'react';
import { Link } from 'react-router-dom';
import { dummyCourses } from '../../data/courseData';
import CourseCard from '../../components/Dashboard/CourseCard';


const Dashboard = () => {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
          
            <header className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-3xl font-extrabold text-blue-900 tracking-tight">System Overview</h2>
                    <p className="text-gray-500">Manage and preview all active courses in the system.</p>
                </div>
                <Link 
                    to="/dashboard/create-course" 
                    className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 cursor-pointer"
                >
                    + Create New Course
                </Link>
            </header>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {dummyCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                ))}

                {/* Empty State */}
                {dummyCourses.length === 0 && (
                    <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-gray-100">
                        <p className="text-gray-400">No courses available. Click the button above to create one!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;

