import React from 'react';
import { LikeIcon, DislikeIcon, NoteIcon, QAIcon } from '../UI/Icons';

 
const InteractionTabs = ({ 
    likes, 
    dislikes, 
    isLiked, 
    onLike, 
    onDislike, 
    activeTab, 
    setActiveTab 
}) => {
    return (
        <div className="p-8 border-b border-gray-50 flex flex-wrap items-center justify-between gap-6">
            {/* Engagement Buttons */}
            <div className="flex gap-3 items-center">
                <button
                    onClick={onLike}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold transition-all active:scale-95 ${isLiked ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                >
                    <LikeIcon className="w-4 h-4" />
                    {likes}
                </button>
                <button
                    onClick={onDislike}
                    className="flex items-center gap-2 px-6 py-2.5 bg-gray-50 text-gray-400 rounded-full font-bold hover:bg-gray-100 transition-all active:scale-95 shadow-none"
                >
                    <DislikeIcon className="w-4 h-4" />
                    {dislikes}
                </button>
            </div>

            {/* Tab Switcher */}
            <div className="flex items-center bg-gray-100/50 p-1.5 rounded-2xl border border-gray-100 shadow-inner">
                <button
                    onClick={() => setActiveTab("notes")}
                    className={`flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-black transition-all ${activeTab === 'notes' ? 'bg-white text-blue-600 shadow-sm border border-gray-50' : 'text-gray-400 hover:text-gray-600'}`}
                >
                    <NoteIcon className="w-4 h-4" />
                    Study Notes
                </button>
                <button
                    onClick={() => setActiveTab("doubts")}
                    className={`flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-black transition-all ${activeTab === 'doubts' ? 'bg-white text-purple-600 shadow-sm border border-gray-50' : 'text-gray-400 hover:text-gray-600'}`}
                >
                    <QAIcon className="w-4 h-4" />
                    Q&A Board
                </button>
            </div>
        </div>
    );
};

export default InteractionTabs;
