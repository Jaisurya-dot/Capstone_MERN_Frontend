import React, { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { dummyCourses } from '../../data/courseData';
import { useWatchState } from '../../hooks/useWatchState';

// Extracted WatchCourse Components
import WatchHeader from '../../components/WatchCourse/WatchHeader';
import VideoPlayer from '../../components/WatchCourse/VideoPlayer';
import InteractionTabs from '../../components/WatchCourse/InteractionTabs';
import NotesSection from '../../components/WatchCourse/NotesSection';
import QASection from '../../components/WatchCourse/QASection';
import CoursePlaylist from '../../components/WatchCourse/CoursePlaylist';

 
const WatchCourse = () => {
    const { courseId, lessonId } = useParams();
    const videoContainerRef = useRef(null);
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Fetch course and active lesson details
    const course = dummyCourses.find(c => c.id === courseId) || dummyCourses[0];
    const activeModule = course.modules.find(m => m.lessons.some(l => String(l.id) === lessonId)) || course.modules[0];
    const activeLesson = activeModule.lessons.find(l => String(l.id) === lessonId) || activeModule.lessons[0];

    // Engagement and Discussion State (Handled by custom hook)
    const {
        likes, dislikes, isLiked,
        activeTab, setActiveTab,
        notes, setNotes,
        doubts, setDoubts,
        newDoubt, setNewDoubt,
        handleLike, handleDislike,
        handleDoubtSubmit
    } = useWatchState();

    /**
     * Toggles fullscreen mode for the video container.
     */
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            videoContainerRef.current?.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    /**
     * Registers global keyboard shortcuts (e.g., 'F' for fullscreen).
     */
    useEffect(() => {
        const onFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
        const onKeyDown = (e) => {
            if (e.key.toLowerCase() === 'f') {
                const active = document.activeElement;
                if (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA') return;
                toggleFullscreen();
            }
        };

        document.addEventListener('fullscreenchange', onFullscreenChange);
        window.addEventListener('keydown', onKeyDown);
        
        return () => {
            document.removeEventListener('fullscreenchange', onFullscreenChange);
            window.removeEventListener('keydown', onKeyDown);
        };
    }, []);

    return (
        <div className="flex flex-col lg:flex-row h-screen bg-white">
            {/* Left/Main Column: Video & Lesson Interactions */}
            <div className="flex-1 overflow-y-auto bg-white">
                <WatchHeader 
                    courseId={course.id} 
                    lessonTitle={activeLesson.title} 
                />

                <VideoPlayer 
                    lesson={activeLesson}
                    isFullscreen={isFullscreen}
                    toggleFullscreen={toggleFullscreen}
                    containerRef={videoContainerRef}
                />

                <div className="max-w-4xl mx-auto pb-24 px-4 sm:px-8">
                    <InteractionTabs 
                        likes={likes}
                        dislikes={dislikes}
                        isLiked={isLiked}
                        onLike={handleLike}
                        onDislike={handleDislike}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />

                    <div className="py-8">
                        {activeTab === 'notes' ? (
                            <NotesSection 
                                value={notes} 
                                onChange={setNotes} 
                            />
                        ) : (
                            <QASection 
                                newDoubt={newDoubt}
                                setNewDoubt={setNewDoubt}
                                onSubmitDoubt={handleDoubtSubmit}
                                doubts={doubts}
                                setDoubts={setDoubts}
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Right Column: Persistent Course Playlist */}
            <aside className="lg:sticky lg:top-0 h-auto lg:h-screen">
                <CoursePlaylist 
                    course={course}
                    courseId={course.id}
                    lessonId={lessonId}
                />
            </aside>
        </div>
    );
};

export default WatchCourse;

