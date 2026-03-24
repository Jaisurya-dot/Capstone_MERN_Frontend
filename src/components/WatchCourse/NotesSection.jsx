import React from 'react';

 
const NotesSection = ({ value, onChange }) => {
    return (
        <div className="space-y-6 animate-in slide-in-from-bottom-5 duration-500">
            <h4 className="text-xl font-black text-gray-800">My Study Notes</h4>
            
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Draft your thoughts, key concepts, or code snippets here... (Content is auto-saved)"
                className="w-full p-8 bg-yellow-50/40 border-2 border-yellow-100/50 rounded-3xl min-h-[400px] outline-none text-gray-800 italic placeholder:text-gray-300 focus:border-yellow-200 focus:bg-yellow-50/60 transition-all text-xl shadow-inner leading-relaxed resize-none"
            />
            
            <p className="text-xs text-yellow-600/60 flex items-center gap-2 italic">
                <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse"></span>
                Drafting your notes... changes are saved automatically.
            </p>
        </div>
    );
};

export default NotesSection;
