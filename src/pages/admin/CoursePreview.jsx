import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { dummyCourses } from '../../data/courseData';
import PrimaryButton from '../../components/UI/PrimaryButton';

const CoursePreview = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        // Simulating a fetch request for a specific ID
        const timer = setTimeout(() => {
            const foundCourse = dummyCourses.find(c => c.id === courseId);
            if (foundCourse) {
                setCourse(foundCourse);
            } else {
                setError(true);
            }
            setLoading(false);
        }, 600);
        return () => clearTimeout(timer);
    }, [courseId]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
                <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
                <p className="text-gray-500 font-medium animate-pulse">Fetching {courseId}...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] space-y-6 text-center">
                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-red-500">
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                </div>
                <div className="space-y-2">
                    <h2 className="text-2xl font-black text-gray-800">Course Not Found</h2>
                    <p className="text-gray-500">We couldn't find the requested course in our system.</p>
                </div>
                <Link to="/dashboard" className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl active:scale-95 transition-all">
                    Return to Dashboard
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700">
            {/* Breadcrumb / Top Nav */}
            <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>Courses</span>
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                <span className="text-blue-600 font-medium">{course.category}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Main Content (Left) */}
                <div className="lg:col-span-2 space-y-10">
                    <section>
                        <h1 className="text-4xl font-extrabold text-blue-900 leading-tight mb-4">{course.title}</h1>
                        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">{course.description}</p>

                        <div className="flex flex-wrap items-center gap-6 mt-8">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">JS</div>
                                <div>
                                    <p className="text-xs text-gray-400">Instructor</p>
                                    <p className="text-sm font-bold text-gray-800">{course.instructor}</p>
                                </div>
                            </div>
                            <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>
                            <div className="flex items-center gap-6">
                                <div>
                                    <p className="text-xs text-gray-400">Rating</p>
                                    <p className="text-sm font-bold text-gray-800">{course.rating}</p>
                                </div>
                                <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>
                                <Link to={`/dashboard/create-course/${course.id}`} className="flex items-center gap-2 px-5 py-2.5 bg-blue-50 text-blue-600 rounded-xl font-bold hover:bg-blue-100 transition-all">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                    Edit Course Form
                                </Link>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                            <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h7" /></svg>
                            </span>
                            Course Curriculum
                        </h2>

                        <div className="space-y-4">
                            {course.modules.map((module, idx) => (
                                <div key={module.id} className="border border-gray-100 rounded-2xl overflow-hidden hover:border-blue-200 transition-all">
                                    <div className="bg-gray-50/50 p-5 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <span className="text-blue-600 font-black opacity-20 text-2xl">{idx + 1}</span>
                                            <h3 className="font-bold text-gray-700">{module.title}</h3>
                                        </div>
                                        <span className="text-xs font-bold text-blue-500 bg-blue-50 px-3 py-1 rounded-full">{module.lessons.length} Lessons</span>
                                    </div>
                                    <div className="divide-y divide-gray-50 px-5">
                                        {module.lessons.map(lesson => (
                                            <Link 
                                                key={lesson.id} 
                                                to={`/dashboard/watch/${course.id}/${lesson.id}`}
                                                className="py-4 flex items-center justify-between group hover:bg-gray-50 -mx-5 px-5 transition-colors cursor-pointer"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <span className="text-gray-300 group-hover:text-blue-400 transition-colors">
                                                        {lesson.fileType === 'video' ? (
                                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                        ) : (
                                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                                                        )}
                                                    </span>
                                                    <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">{lesson.title}</span>
                                                </div>
                                                <span className="text-xs text-gray-400 font-mono">{lesson.duration}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Sidebar (Right) */}
                <div className="space-y-6">
                    <div className="bg-white p-2 rounded-3xl shadow-xl shadow-blue-100/50 border border-gray-100 sticky top-8">
                        <div className="aspect-video rounded-2xl bg-slate-900 flex items-center justify-center relative group overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2831&auto=format&fit=crop" alt="preview" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" />
                            <div className="relative z-10 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl scale-125 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-8 h-8 text-white fill-current" viewBox="0 0 20 20"><path d="M5 4v12l10-6L5 4z" /></svg>
                            </div>
                            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm font-bold opacity-80 group-hover:opacity-100 transition-opacity whitespace-nowrap">Preview This Course</p>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="flex items-center gap-4">
                                <span className="text-4xl font-black text-gray-900">FREE</span>
                            </div>

                            <Link 
                                to={`/dashboard/watch/${course.id}/${course.modules[0].lessons[0]?.id || ''}`}
                                className="w-full"
                            >
                                <PrimaryButton className="w-full py-4 text-lg">Enroll in This Course</PrimaryButton>
                            </Link>

                            <div className="space-y-4 pt-4 border-t border-gray-50">
                                <p className="text-sm font-bold text-gray-800 uppercase tracking-widest">Includes:</p>
                                <ul className="space-y-3">
                                    {[
                                        { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', text: '45.5 hours on-demand video' },
                                        { icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', text: 'Full lifetime access' },
                                        { icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z', text: 'Access on mobile and TV' },
                                        { icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10', text: 'Certificate of completion' }
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                                            <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
                                            {item.text}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoursePreview;
