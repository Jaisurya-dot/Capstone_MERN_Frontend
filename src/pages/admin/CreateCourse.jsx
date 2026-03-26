import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BasicInfoForm from '../../components/CreateCourse/BasicInfoForm';
import ModuleBuilder from '../../components/CreateCourse/ModuleBuilder';
import ThumbnailSection from '../../components/CreateCourse/ThumbnailSection';
import PrimaryButton from '../../components/UI/PrimaryButton';
import { dummyCourses } from '../../data/courseData';
import { useCourseState } from '../../hooks/useCourseState';

/**
 * Page component for creating or editing a course.
 * Manages complex state including modules and lessons using the useCourseState hook.
 */
const CreateCourse = () => {
    const { courseId } = useParams();

    // Default template for a new course
    const initialCourseDetails = {
        title: '',
        description: '',
        category: 'Development',
        level: 'Beginner',
        thumbnail: null
    };

    const {
        courseDetails,
        setCourseDetails,
        modules,
        setModules,
        updateCourseDetails,
        addModule,
        removeModule,
        updateModuleTitle,
        addLesson,
        removeLesson,
        updateLesson
    } = useCourseState(initialCourseDetails);

    // Effect to pre-populate form if editing an existing course
    useEffect(() => {
        if (courseId) {
            const foundCourse = dummyCourses.find(c => c.id === courseId);
            if (foundCourse) {
                setCourseDetails({
                    title: foundCourse.title,
                    description: foundCourse.description,
                    category: foundCourse.category,
                    level: foundCourse.level,
                    thumbnail: foundCourse.thumbnail
                });
                setModules(foundCourse.modules);
            }
        }
    }, [courseId, setCourseDetails, setModules]);

   
    const handleCourseChange = (e) => {
        const { name, value } = e.target;
        updateCourseDetails(name, value);
    };

    /**
     * Specifically handles thumbnail file upload.
     */
    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            updateCourseDetails('thumbnail', file);
        }
    };

    const handleSaveDraft = () => console.log('Draft saved:', { courseDetails, modules });
    const handlePublish = () => console.log('Publishing:', { courseDetails, modules });

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
            {/* Header Section */}
            <header className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-3xl font-extrabold text-blue-900 tracking-tight">
                        {courseId ? 'Edit Course Details' : 'Create New Course'}
                    </h1>
                    <p className="text-gray-500">
                        {courseId ? `Modifying: ${courseDetails.title}` : 'Design and publish your latest masterpiece.'}
                    </p>
                </div>
                <div className="flex gap-4">
                    <PrimaryButton variant="secondary" onClick={handleSaveDraft}>
                        Save Draft
                    </PrimaryButton>
                    <PrimaryButton onClick={handlePublish}>
                        {courseId ? 'Update & Sync' : 'Publish Course'}
                    </PrimaryButton>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content (Left Column) */}
                <div className="lg:col-span-2 space-y-8">
                    <BasicInfoForm 
                        courseDetails={courseDetails} 
                        handleCourseChange={handleCourseChange} 
                    />

                    <ModuleBuilder 
                        modules={modules}
                        addModule={addModule}
                        removeModule={removeModule}
                        handleModuleTitleChange={updateModuleTitle}
                        addLesson={addLesson}
                        removeLesson={removeLesson}
                        handleLessonChange={updateLesson}
                    />
                </div>

                {/* Vertical Sidebar (Right Column) */}
                <div className="space-y-6">
                    <ThumbnailSection 
                        thumbnail={courseDetails.thumbnail} 
                        handleThumbnailChange={handleThumbnailChange} 
                    />
                </div>



            </div>
        </div>
    );
};

export default CreateCourse;

