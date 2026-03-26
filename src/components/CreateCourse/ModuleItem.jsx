import React from 'react';
import LessonItem from './LessonItem';
import { TrashIcon, PlusIcon } from '../UI/Icons';

 
const ModuleItem = ({ 
    module, 
    moduleIndex, 
    handleModuleTitleChange, 
    removeModule, 
    addLesson, 
    removeLesson, 
    handleLessonChange 
}) => {
    return (
        <div className="group border border-gray-200 rounded-2xl overflow-hidden hover:border-blue-300 transition-all duration-300 bg-white">
            <div className="bg-gray-50 p-4 flex items-center gap-4">
                <div className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-lg font-bold">
                    {moduleIndex + 1}
                </div>
                <input
                    value={module.title}
                    onChange={(e) => handleModuleTitleChange(module.id, e.target.value)}
                    placeholder="Module Title (e.g. Getting Started)"
                    className="flex-1 bg-transparent font-semibold text-gray-700 outline-none focus:text-blue-600 transition-colors"
                />
                <button
                    onClick={() => removeModule(module.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                    title="Remove Module"
                >
                    <TrashIcon className="w-5 h-5" />
                </button>
            </div>

            <div className="p-4 space-y-4">
                {module.lessons.map((lesson, lessonIndex) => (
                    <LessonItem
                        key={lesson.id}
                        lesson={lesson}
                        lessonIndex={lessonIndex}
                        moduleId={module.id}
                        handleLessonChange={handleLessonChange}
                        removeLesson={removeLesson}
                    />
                ))}

                <button
                    onClick={() => addLesson(module.id)}
                    className="w-full py-3 flex items-center justify-center gap-2 text-sm text-gray-400 font-medium border-2 border-dashed border-gray-100 rounded-xl hover:border-blue-200 hover:text-blue-500 hover:bg-blue-50/30 transition-all cursor-pointer"
                >
                    <PlusIcon className="w-4 h-4" />
                    Add Lesson / File
                </button>
            </div>
        </div>
    );
};

export default ModuleItem;

