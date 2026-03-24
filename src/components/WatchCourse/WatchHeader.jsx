import React from 'react';
import { Link } from 'react-router-dom';
import { BackIcon } from '../UI/Icons';

 
const WatchHeader = ({ courseId, lessonTitle }) => {
    return (
        <header className="p-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-50">
            <Link 
                to={`/dashboard/preview-course/${courseId}`} 
                className="text-sm font-bold text-blue-600 flex items-center gap-2 hover:bg-blue-50 px-3 py-2 rounded-xl transition-all"
            >
                <BackIcon className="w-4 h-4" />
                Back to Course
            </Link>
            
            <h2 className="font-black text-gray-800 text-base pointer-events-none truncate px-4">
                {lessonTitle}
            </h2>
            
            <div className="w-24 hidden md:block"></div>  
        </header>
    );
};

export default WatchHeader;
