import React from 'react';
import { Link } from 'react-router-dom';

 
const CoursePlaylist = ({ course, courseId, lessonId }) => {
    return (
        <div className="w-full lg:w-[400px] border-l border-gray-100 bg-gray-50 flex flex-col h-full lg:h-screen lg:rounded-none">
            {/* Playlist Header (Course Title & Progress Tracking) */}
            <div className="p-6 border-b border-gray-200 bg-white">
                <h3 className="font-extrabold text-blue-900 leading-tight mb-2">Course Playlist</h3>
                <div className="flex items-center justify-between">
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                        <div className="w-1/4 h-full bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.3)]"></div>
                    </div>
                    <span className="text-[10px] font-black text-gray-400 ml-4 whitespace-nowrap uppercase tracking-widest leading-none">
                        25% Done
                    </span>
                </div>
            </div>

            {/* Playlist Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-5 scrollbar-thin scrollbar-thumb-gray-200">
                {course.modules.map((module, idx) => (
                    <div key={module.id} className="space-y-2">
                        <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2 mb-3 mt-1">
                            {`Module ${idx + 1}`}
                        </h5>
                        
                        <div className="space-y-1">
                            {module.lessons.map(lesson => {
                                const isActive = String(lesson.id) === lessonId;
                                
                                return (
                                    <Link
                                        key={lesson.id}
                                        to={`/dashboard/watch/${courseId}/${lesson.id}`}
                                        className={`flex items-center gap-3 p-4 rounded-2xl transition-all active:scale-95 ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white hover:bg-blue-50 text-gray-600 border border-gray-100'}`}
                                    >
                                        <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold ${isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-400'}`}>
                                            {lesson.fileType === 'video' ? '▶' : '📄'}
                                        </span>
                                        <span className="text-sm font-bold truncate flex-1">
                                            {lesson.title}
                                        </span>
                                        {isActive && (
                                            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-[0_0_8px_white]"></div>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CoursePlaylist;
