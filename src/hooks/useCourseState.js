import { useState, useCallback } from 'react';

/**
 * Custom hook to manage the state of a course during creation or editing.
 * Handles course details, modules, and lessons.
 *
 * @param {Object} initialDetails - Initial state for the course metadata.
 * @returns {Object} - Object containing course state and update functions.
 */
export const useCourseState = (initialDetails) => {
    const [courseDetails, setCourseDetails] = useState(initialDetails);
    const [modules, setModules] = useState([{ id: Date.now(), title: 'Introduction', lessons: [] }]);

    /**
     * Updates course-level metadata (title, description, etc.)
     */
    const updateCourseDetails = useCallback((name, value) => {
        setCourseDetails(prev => ({ ...prev, [name]: value }));
    }, []);

    /**
     * Handles adding a new, empty module.
     */
    const addModule = useCallback(() => {
        setModules(prev => [...prev, { id: Date.now(), title: '', lessons: [] }]);
    }, []);

    /**
     * Removes a module by its unique ID.
     */
    const removeModule = useCallback((id) => {
        setModules(prev => prev.filter(m => m.id !== id));
    }, []);

    /**
     * Updates the title of a specific module.
     */
    const updateModuleTitle = useCallback((id, title) => {
        setModules(prev => prev.map(m => m.id === id ? { ...m, title } : m));
    }, []);

    /**
     * Adds a new lesson to a specific module.
     */
    const addLesson = useCallback((moduleId) => {
        setModules(prev => prev.map(m => {
            if (m.id === moduleId) {
                return {
                    ...m,
                    lessons: [...m.lessons, { id: Date.now(), title: '', fileType: 'video' }]
                };
            }
            return m;
        }));
    }, []);

    /**
     * Removes a lesson from a specific module.
     */
    const removeLesson = useCallback((moduleId, lessonId) => {
        setModules(prev => prev.map(m => {
            if (m.id === moduleId) {
                return {
                    ...m,
                    lessons: m.lessons.filter(l => l.id !== lessonId)
                };
            }
            return m;
        }));
    }, []);

    /**
     * Updates a lesson's field (title or fileType).
     */
    const updateLesson = useCallback((moduleId, lessonId, field, value) => {
        setModules(prev => prev.map(m => {
            if (m.id === moduleId) {
                return {
                    ...m,
                    lessons: m.lessons.map(l => l.id === lessonId ? { ...l, [field]: value } : l)
                };
            }
            return m;
        }));
    }, []);

    return {
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
    };
};
