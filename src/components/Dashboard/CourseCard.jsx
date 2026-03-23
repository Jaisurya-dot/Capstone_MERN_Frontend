import React from 'react';
import { Link } from 'react-router-dom';

/**
 * A reusable card component to display course information.
 * Used in the Dashboard and other listing pages.
 *
 * @param {Object} course - The course data object.
 */
const CourseCard = ({ course }) => {
    return (
        <div 
            key={course.id} 
            className="bg-white rounded-3xl p-2 shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-blue-900/5 transition-all group overflow-hidden flex flex-col"
        >
            {/* Thumbnail Header */}
            <div className="aspect-video rounded-2xl bg-gray-100 mb-4 relative overflow-hidden">
                <img 
                    src={course.thumbnail} 
                    alt={course.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-blue-600 border border-blue-100">
                    {course.category}
                </div>
            </div>
            
            {/* Card Content */}
            <div className="px-4 pb-6 flex-1 flex flex-col">
                <h3 className="font-bold text-gray-800 text-lg mb-2 leading-tight group-hover:text-blue-600 transition-colors">
                    {course.title}
                </h3>
                <p className="text-sm text-gray-400 line-clamp-2 mb-4 leading-relaxed">
                    {course.description}
                </p>
                
                {/* Metrics Footer */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-300 font-bold uppercase tracking-tighter">Students</span>
                        <span className="text-sm font-black text-gray-700">
                            {course.enrollments.toLocaleString()}
                        </span>
                    </div>
                    <div className="flex flex-col text-right">
                        <span className="text-[10px] text-gray-300 font-bold uppercase tracking-tighter">Level</span>
                        <span className="text-sm font-black text-blue-500">{course.level}</span>
                    </div>
                </div>

                {/* Navigation Button */}
                <Link 
                    to={`/dashboard/preview-course/${course.id}`}
                    className="mt-6 font-bold py-3 text-center bg-gray-50 text-gray-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all shadow-none hover:shadow-lg active:scale-95"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default CourseCard;
