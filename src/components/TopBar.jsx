import React from 'react';

const TopBar = () => {
    return (
        <div className="h-16 bg-white shadow flex items-center justify-between px-6">

            <h1 className="text-lg font-semibold">Instructor</h1>

            <div className="flex items-center gap-4">
                <span className="text-gray-600">Instructor</span>
                <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
            </div>

        </div>
    );  
};

export default TopBar;