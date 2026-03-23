import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { dummyCourses } from '../../data/courseData';
import PrimaryButton from '../../components/UI/PrimaryButton';

const WatchCourse = () => {
    const { courseId, lessonId } = useParams();
    const videoContainerRef = useRef(null);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const course = dummyCourses.find(c => c.id === courseId) || dummyCourses[0];

    // Find active lesson (or default to first)
    const activeModule = course.modules.find(m => m.lessons.some(l => String(l.id) === lessonId)) || course.modules[0];
    const activeLesson = activeModule.lessons.find(l => String(l.id) === lessonId) || activeModule.lessons[0];

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        const handleKeyPress = (e) => {
            if (e.key.toLowerCase() === 'f') {
                const active = document.activeElement;
                if (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA') return;
                toggleFullscreen();
            }
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        window.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            videoContainerRef.current?.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    const [notes, setNotes] = useState("");
    const [likes, setLikes] = useState(124);
    const [dislikes, setDislikes] = useState(4);
    const [isLiked, setIsLiked] = useState(false);
    const [doubts, setDoubts] = useState([
        { id: 1, user: 'Rahul K.', text: 'How does the recursion base case work here?', time: '2 mins ago', replies: 1 },
        { id: 2, user: 'Aman S.', text: 'Clear explanation! Thanks.', time: '10 mins ago', replies: 0 }
    ]);
    const [newDoubt, setNewDoubt] = useState("");

    const handleDoubtSubmit = () => {
        if (!newDoubt) return;
        setDoubts([{ id: Date.now(), user: 'You', text: newDoubt, time: 'Just now', replies: 0 }, ...doubts]);
        setNewDoubt("");
    };

    const [activeTab, setActiveTab] = useState("doubts"); // Default to doubts for engagement

    return (
        <div className="flex flex-col lg:flex-row h-screen bg-white">
            {/* Main Content (Video & Interactions) */}
            <div className="flex-1 overflow-y-auto">
                {/* 1. Header (Back Link & Title) */}
                <header className="p-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-50">
                    <Link to={`/dashboard/preview-course/${course.id}`} className="text-sm font-bold text-blue-600 flex items-center gap-2 hover:bg-blue-50 px-3 py-2 rounded-xl transition-all">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
                        Back to Course
                    </Link>
                    <h2 className="font-black text-gray-800 text-base pointer-events-none truncate px-4">{activeLesson.title}</h2>
                    <div className="w-24"></div> {/* placeholder for balance */}
                </header>

                {/* 2. Video Player Section */}
                <div ref={videoContainerRef} className={`bg-black aspect-video relative group transition-all duration-500 ${isFullscreen ? 'w-full h-screen' : ''}`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                        {/* Placeholder for real video embed */}
                        {activeLesson.fileType === 'video' ? (
                            <img src="https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=2932&auto=format&fit=crop" className="w-full h-full object-cover opacity-60" alt="Video Placeholder" />
                        ) : (
                            <div className="text-white text-center p-10 bg-slate-800 rounded-3xl">This is a document lesson. [View PDF]</div>
                        )}
                        <div className="absolute z-10 w-20 h-20 bg-blue-600/90 text-white rounded-full flex items-center justify-center scale-110 group-hover:scale-125 transition-transform duration-300 shadow-2xl shadow-blue-500/50 cursor-pointer">
                            <svg className="w-10 h-10 fill-current ml-1" viewBox="0 0 20 20"><path d="M5 4v12l10-6L5 4z" /></svg>
                        </div>
                    </div>

                    {/* Fullscreen Toggle Button */}
                    <button
                        onClick={toggleFullscreen}
                        className="absolute bottom-6 right-6 p-3 bg-white/10 backdrop-blur rounded-xl text-white opacity-0 group-hover:opacity-100 hover:bg-white/20 transition-all z-20"
                        title={isFullscreen ? "Exit Fullscreen (Esc)" : "Enter Fullscreen"}
                    >
                        {isFullscreen ? (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 9L4 4m0 0l0 5m0-5l5 0m5 5l5-5m0 0v5m0-5h-5m-5 10v-5m0 0h5m0 0L4 20m11-1h5m0 0v-5m0 5l-5-5" /></svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                        )}
                    </button>

                    {/* Simple Progress Bar Overlay */}
                    <div className="absolute bottom-0 inset-x-0 h-1.5 bg-white/10 group-hover:h-2 transition-all">
                        <div className="h-full bg-blue-600 w-1/3 shadow-[0_0_10px_rgba(37,99,235,0.8)]"></div>
                    </div>
                </div>

                {/* 3. Interaction Section (Tab Switcher & Actions) */}
                <div className="max-w-4xl mx-auto pb-24">
                    {/* Header with Like/Dislike */}
                    <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                        <div className="flex gap-2 items-center">
                            <button
                                onClick={() => { setLikes(likes + 1); setIsLiked(true); }}
                                className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold transition-all active:scale-90 ${isLiked ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.704a2 2 0 011.94 2.515l-1.203 4.812A2 2 0 0117.5 19H5a1 1 0 01-1-1v-9a1 1 0 011-1h2.5a2 2 0 001.664-.89l.812-1.22A2 2 0 0111.64 5H14a2 2 0 012 2v3z" /></svg>
                                {likes}
                            </button>
                            <button
                                onClick={() => setDislikes(dislikes + 1)}
                                className="flex items-center gap-2 px-6 py-2.5 bg-gray-50 text-gray-400 rounded-full font-bold hover:bg-gray-100 transition-all active:scale-90"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.296a2 2 0 01-1.94-2.515l1.203-4.812A2 2 0 017 5h12.5a1 1 0 011 1v9a1 1 0 01-1 1H17a2 2 0 00-1.664.89l-.812 1.22A2 2 0 0112.36 19H10a2 2 0 01-2-2v-3z" /></svg>
                                {dislikes}
                            </button>
                        </div>
                        <div className="flex items-center bg-gray-100/50 p-1.5 rounded-2xl border border-gray-100 shadow-inner">
                            <button
                                onClick={() => setActiveTab("notes")}
                                className={`flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-black transition-all ${activeTab === 'notes' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                Notes
                            </button>
                            <button
                                onClick={() => setActiveTab("doubts")}
                                className={`flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-black transition-all ${activeTab === 'doubts' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                                Q&A board
                            </button>
                        </div>
                    </div>

                    <div className="p-8">
                        {activeTab === 'notes' ? (
                            <div className="space-y-6 animate-in slide-in-from-bottom-5 duration-500">
                                <h4 className="text-xl font-black text-gray-800">My Study Notes</h4>
                                <textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Jot down important points from the video here... (Auto-saved)"
                                    className="w-full p-8 bg-yellow-50/30 border-2 border-yellow-100 rounded-3xl min-h-[400px] outline-none text-gray-800 italic placeholder:text-gray-300 focus:border-yellow-200 transition-all text-lg shadow-inner"
                                />
                            </div>
                        ) : (
                            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                                <h4 className="text-xl font-black text-gray-800">Questions & Discussion</h4>
                                <div className="space-y-6 max-w-2xl">
                                    <div className="flex flex-col gap-3 p-6 bg-purple-50 rounded-3xl border border-purple-100">
                                        <input
                                            value={newDoubt}
                                            onChange={(e) => setNewDoubt(e.target.value)}
                                            placeholder="Ask something about this lesson..."
                                            className="w-full px-5 py-4 bg-white rounded-2xl border-none outline-none font-medium shadow-sm"
                                        />
                                        <div className="text-right">
                                            <button onClick={handleDoubtSubmit} className="px-8 py-3 bg-purple-600 text-white rounded-xl text-sm font-black hover:bg-purple-700 active:scale-95 transition-all shadow-lg shadow-purple-200">Post Question</button>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        {doubts.map((doubt, dIndex) => {
                                            const isTop = doubt.votes > 5 || dIndex === 0; // Simple logic for MVP top answer
                                            return (
                                                <div key={doubt.id} className={`p-6 bg-white border rounded-3xl transition-all group flex gap-5 ${isTop ? 'border-purple-200 bg-purple-50/20' : 'border-gray-100'}`}>
                                                    {/* Vote Counter Column */}
                                                    <div className="flex flex-col items-center gap-1">
                                                        <button 
                                                            onClick={() => {
                                                                const newDoubts = doubts.map(d => d.id === doubt.id ? {...d, votes: d.votes + 1} : d);
                                                                setDoubts(newDoubts);
                                                            }}
                                                            className="p-2 bg-gray-50 rounded-lg text-gray-400 hover:bg-purple-100 hover:text-purple-600 transition-all active:scale-90"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" /></svg>
                                                        </button>
                                                        <span className="text-sm font-black text-gray-800">{doubt.votes || 0}</span>
                                                        <span className="text-[8px] font-black text-gray-300 uppercase tracking-tighter -mt-1">Votes</span>
                                                    </div>

                                                    {/* Content Column */}
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between mb-3">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black">{doubt.user[0]}</div>
                                                                <span className="text-xs font-black uppercase text-gray-700 tracking-widest">{doubt.user}</span>
                                                                {isTop && (
                                                                    <span className="bg-purple-600 text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest animate-pulse">Top Answer</span>
                                                                )}
                                                            </div>
                                                            <span className="text-[10px] text-gray-300 uppercase font-black">{doubt.time}</span>
                                                        </div>
                                                        <p className="text-gray-600 leading-relaxed font-medium text-sm">{doubt.text}</p>
                                                        <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between text-[10px] font-black text-purple-400 group-hover:text-purple-600 transition-colors uppercase tracking-widest">
                                                            <span>{doubt.replies} Replies</span>
                                                            <button className="underline opacity-0 group-hover:opacity-100 transition-opacity">Add Comment</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Sidebar (Course Content) */}
            <div className="w-full lg:w-[400px] border-l border-gray-100 bg-gray-50 flex flex-col">
                <div className="p-6 border-b border-gray-200 bg-white">
                    <h3 className="font-extrabold text-blue-900 leading-tight mb-2">Course Playlist</h3>
                    <div className="flex items-center justify-between">
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="w-1/4 h-full bg-emerald-500 rounded-full"></div>
                        </div>
                        <span className="text-[10px] font-black text-gray-400 ml-4 whitespace-nowrap uppercase">25% Done</span>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {course.modules.map((module, idx) => (
                        <div key={module.id} className="space-y-2">
                            <h5 className="text-[10px] font-black text-gray-300 uppercase tracking-widest px-2">{`Module ${idx + 1}`}</h5>
                            <div className="space-y-1">
                                {module.lessons.map(lesson => (
                                    <Link
                                        key={lesson.id}
                                        to={`/dashboard/watch/${course.id}/${lesson.id}`}
                                        className={`flex items-center gap-3 p-4 rounded-2xl transition-all ${String(lesson.id) === lessonId ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white hover:bg-blue-50 text-gray-600 border border-gray-100'}`}
                                    >
                                        <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold ${String(lesson.id) === lessonId ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-400'}`}>
                                            {lesson.fileType === 'video' ? '▶' : '📄'}
                                        </span>
                                        <span className="text-sm font-bold truncate flex-1">{lesson.title}</span>
                                        {String(lesson.id) === lessonId && (
                                            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
                                        )}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WatchCourse;
