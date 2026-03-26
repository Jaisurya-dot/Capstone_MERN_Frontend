import { useState, useCallback } from 'react';


export const useCourseState = (initialDetails) => {
    const [courseDetails, setCourseDetails] = useState(initialDetails);
    const [modules, setModules] = useState([{ id: Date.now(), title: 'Introduction', lessons: [] }]);

    
    const updateCourseDetails = useCallback((name, value) => {
        setCourseDetails(prev => ({ ...prev, [name]: value }));
    }, []);

    
    const addModule = useCallback(() => {
        setModules(prev => [...prev, { id: Date.now(), title: '', lessons: [] }]);
    }, []);

    
    const removeModule = useCallback((id) => {
        setModules(prev => prev.filter(m => m.id !== id));
    }, []);

     
    const updateModuleTitle = useCallback((id, title) => {
        setModules(prev => prev.map(m => m.id === id ? { ...m, title } : m));
    }, []);

    
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
