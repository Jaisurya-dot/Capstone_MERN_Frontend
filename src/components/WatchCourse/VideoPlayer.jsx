import React from 'react';
import { PlayIcon, FullscreenEnterIcon, FullscreenExitIcon } from '../UI/Icons';

 
const VideoPlayer = ({ lesson, isFullscreen, toggleFullscreen, containerRef }) => {
    return (
        <div 
            ref={containerRef} 
            className={`bg-black aspect-video relative group transition-all duration-500 overflow-hidden ${isFullscreen ? 'w-full h-screen' : ''}`}
        >
            <div className="absolute inset-0 flex items-center justify-center">
                {/* Media Content Area */}
                {lesson.fileType === 'video' ? (
                    <img 
                        src="https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=2932&auto=format&fit=crop" 
                        className="w-full h-full object-cover opacity-60" 
                        alt="Video Placeholder" 
                    />
                ) : (
                    <div className="text-white text-center p-10 bg-slate-800 rounded-3xl border border-white/10">
                        <p className="text-lg font-bold">This is a document lesson.</p>
                        <button className="mt-4 px-6 py-2 bg-blue-600 rounded-xl hover:bg-blue-700 transition-all font-bold">
                            View PDF Content
                        </button>
                    </div>
                )}

                {/* Play Button Overlay (for aesthetic/click simulation) */}
                <div className="absolute z-10 w-20 h-20 bg-blue-600/90 text-white rounded-full flex items-center justify-center scale-110 group-hover:scale-125 transition-transform duration-300 shadow-2xl shadow-blue-500/50 cursor-pointer">
                    <PlayIcon className="w-10 h-10 fill-current ml-1" />
                </div>
            </div>

            {/* Video Player Controls (Overlay) */}
            <div className="absolute bottom-6 right-6 flex items-center gap-4 z-20">
                <button
                    onClick={toggleFullscreen}
                    className="p-3 bg-white/10 backdrop-blur rounded-xl text-white opacity-0 group-hover:opacity-100 hover:bg-white/20 transition-all"
                    title={isFullscreen ? "Exit Fullscreen (F / Esc)" : "Enter Fullscreen (F)"}
                >
                    {isFullscreen ? <FullscreenExitIcon /> : <FullscreenEnterIcon />}
                </button>
            </div>

            {/* Simple Progress Bar Overlay */}
            <div className="absolute bottom-0 inset-x-0 h-1.5 bg-white/10 group-hover:h-2 transition-all cursor-pointer">
                <div className="h-full bg-blue-600 w-1/3 shadow-[0_0_15px_rgba(37,99,235,0.9)] transition-all"></div>
            </div>
        </div>
    );
};

export default VideoPlayer;
