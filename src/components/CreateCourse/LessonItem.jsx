import React, { useRef } from 'react';
import { CheckCircleIcon, CloudUploadIcon, TrashIcon } from '../UI/Icons';

/**
 * Component representing a single lesson or file entry within a module.
 * Handles simulated file uploads and metadata updates.
 *
 * @param {Object}   lesson - The individual lesson data.
 * @param {number}   lessonIndex - The index of this lesson in the module's list.
 * @param {string}   moduleId - The ID of the parent module.
 * @param {Function} handleLessonChange - Updates lesson properties.
 * @param {Function} removeLesson - Removes this lesson from the module.
 */
const LessonItem = ({ 
    lesson, 
    lessonIndex, 
    moduleId, 
    handleLessonChange, 
    removeLesson 
}) => {
    const fileInputRef = useRef(null);

    /**
     * Handles file selection for the lesson.
     * Simulates an upload process with progress.
     */
    const onFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            handleLessonChange(moduleId, lesson.id, 'fileName', file.name);
            handleLessonChange(moduleId, lesson.id, 'title', file.name.split('.')[0]); // Default title to filename
            handleLessonChange(moduleId, lesson.id, 'isUploading', true);
            
            // Simulating upload progress latency
            setTimeout(() => {
                handleLessonChange(moduleId, lesson.id, 'isUploading', false);
                handleLessonChange(moduleId, lesson.id, 'status', 'complete');
            }, 1500);
        }
    };

    return (
        <div className="flex flex-col gap-2 bg-gray-50/50 p-4 rounded-xl border border-dashed border-gray-200 hover:border-blue-300 transition-all group/lesson relative mb-4">
            <div className="flex items-center gap-4">
                <div className="text-gray-400 text-xs font-black w-4">{lessonIndex + 1}.</div>
                
                <div className="flex-1 flex items-center gap-3">
                    <input 
                        value={lesson.title}
                        onChange={(e) => handleLessonChange(moduleId, lesson.id, 'title', e.target.value)}
                        placeholder="Name of lesson/file"
                        className="flex-1 text-sm bg-transparent outline-none font-bold text-gray-700 focus:text-blue-600 transition-colors"
                    />
                    {lesson.fileName && (
                        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-gray-100 shadow-sm animate-in slide-in-from-right-2 duration-300">
                            <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-500" />
                            <span className="text-[10px] text-gray-400 font-mono truncate max-w-[120px]">
                                {lesson.fileName}
                            </span>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    <select 
                        value={lesson.fileType}
                        onChange={(e) => handleLessonChange(moduleId, lesson.id, 'fileType', e.target.value)}
                        className="text-[10px] bg-white border border-gray-100 rounded-lg px-2 py-1.5 outline-none text-gray-600 font-black tracking-widest uppercase cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                        <option value="video">Video</option>
                        <option value="document">PDF / Doc</option>
                        <option value="link">External Link</option>
                    </select>

                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={onFileChange} 
                        className="hidden" 
                    />
                    
                    <button 
                        onClick={() => fileInputRef.current?.click()}
                        className={`p-2 rounded-lg transition-all cursor-pointer ${lesson.fileName ? 'bg-blue-50 text-blue-600' : 'bg-gray-200 text-gray-400 hover:bg-gray-300 hover:text-gray-600'}`}
                        title="Upload from Local"
                    >
                        <CloudUploadIcon className="w-4 h-4" />
                    </button>

                    <button 
                        onClick={() => removeLesson(moduleId, lesson.id)}
                        className="p-2 text-gray-300 hover:text-red-500 transition-colors cursor-pointer"
                        title="Remove Lesson"
                    >
                        <TrashIcon className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {lesson.isUploading && (
                <div className="w-full h-1 bg-gray-100 rounded-full mt-2 overflow-hidden animate-in fade-in">
                    <div className="h-full bg-blue-500 w-1/3 animate-pulse opacity-70"></div>
                </div>
            )}
        </div>
    );
};

export default LessonItem;

