import React from 'react';
import ModuleItem from './ModuleItem';
import { SyllabusIcon, PlusIcon } from '../UI/Icons';

 
const ModuleBuilder = ({ 
    modules, 
    addModule, 
    removeModule, 
    handleModuleTitleChange, 
    addLesson, 
    removeLesson, 
    handleLessonChange 
}) => {
    return (
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 animate-in fade-in duration-500 delay-150">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <SyllabusIcon className="w-5 h-5 text-blue-500" />
                    Course Syllabus
                </h2>
                <button 
                    onClick={addModule}
                    className="flex items-center gap-2 text-blue-600 font-bold px-4 py-2 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                >
                    <PlusIcon className="w-4 h-4" />
                    Add Module
                </button>
            </div>

            <div className="space-y-6">
                {modules.map((module, moduleIndex) => (
                    <ModuleItem 
                        key={module.id}
                        module={module}
                        moduleIndex={moduleIndex}
                        handleModuleTitleChange={handleModuleTitleChange}
                        removeModule={removeModule}
                        addLesson={addLesson}
                        removeLesson={removeLesson}
                        handleLessonChange={handleLessonChange}
                    />
                ))}

                {modules.length === 0 && (
                    <div className="py-10 text-center border-2 border-dashed border-gray-100 rounded-2xl">
                        <p className="text-gray-400">No modules added yet. Start by adding your first module!</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ModuleBuilder;

