import React from 'react';
import InputField from '../UI/InputField';
import { InfoIcon } from '../UI/Icons';

/**
 * Form section for gathering basic course details.
 * Contains fields for title, description, category, and level.
 *
 * @param {Object}   courseDetails - Current course state.
 * @param {Function} handleCourseChange - Updates general course fields.
 */
const BasicInfoForm = ({ courseDetails, handleCourseChange }) => {
    return (
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 animate-in fade-in duration-500">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <InfoIcon className="w-5 h-5 text-blue-500" />
                Basic Information
            </h2>
            
            <div className="space-y-5">
                <InputField 
                    label="Course Title"
                    name="title"
                    value={courseDetails.title}
                    onChange={handleCourseChange}
                    placeholder="Enter course title"
                />
                
                <InputField 
                    label="Short Description"
                    name="description"
                    value={courseDetails.description}
                    onChange={handleCourseChange}
                    isTextarea={true}
                    placeholder="Briefly describe what students will learn"
                />

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                        <select 
                            name="category" 
                            value={courseDetails.category} 
                            onChange={handleCourseChange}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer"
                        >
                            <option>Development</option>
                            <option>Business</option>
                            <option>Design</option>
                            <option>Marketing</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Difficulty Level</label>
                        <select 
                            name="level" 
                            value={courseDetails.level} 
                            onChange={handleCourseChange}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer"
                        >
                            <option>Beginner</option>
                            <option>Intermediate</option>
                            <option>Expert</option>
                        </select>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BasicInfoForm;

