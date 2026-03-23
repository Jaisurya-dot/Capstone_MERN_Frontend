export const dummyCourses = [
    {
        id: "course_001",
        title: 'Complete Web Development Bootcamp 2026',
        description: 'Master HTML, CSS, JavaScript, and React from scratch. Build 10 real-world projects with modern best practices.',
        category: 'Development',
        level: 'Beginner',
        instructor: 'Jaisurya Selvam',
        lastUpdated: 'March 2026',
        duration: '45.5 hours',
        rating: 4.8,
        enrollments: 1250,
        thumbnail: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2831&auto=format&fit=crop",
        modules: [
            { 
                id: 1, 
                title: 'HTML & CSS Foundations', 
                lessons: [
                    { id: 101, title: 'Introduction to HTML5', fileType: 'video', duration: '10:00' },
                    { id: 102, title: 'CSS Box Model Explained', fileType: 'video', duration: '15:20' }
                ] 
            },
            { 
                id: 2, 
                title: 'Advanced JavaScript Mastery', 
                lessons: [
                    { id: 201, title: 'Closures and Scopes', fileType: 'video', duration: '25:00' }
                ] 
            }
        ]
    },
    {
        id: "course_002",
        title: 'Data Science with Python',
        description: 'Learn data analysis, visualization, and machine learning using Python libraries like Pandas and Scikit-Learn.',
        category: 'Data Science',
        level: 'Intermediate',
        instructor: 'Dr. Sarah Smith',
        lastUpdated: 'Feb 2026',
        duration: '32 hours',
        rating: 4.9,
        enrollments: 850,
        thumbnail: "https://images.unsplash.com/photo-1551288049-bbda02316e9d?q=80&w=2940&auto=format&fit=crop",
        modules: [
            { 
                id: 1, 
                title: 'Python for Data Analysis', 
                lessons: [
                    { id: 301, title: 'Numpy Arrays and Operations', fileType: 'video', duration: '20:15' },
                    { id: 302, title: 'Pandas DataFrames', fileType: 'video', duration: '28:40' }
                ] 
            }
        ]
    },
    {
        id: "course_003",
        title: 'UI/UX Design Masterclass',
        description: 'Design beautiful, user-centered interfaces from wireframing to high-fidelity prototyping in Figma.',
        category: 'Design',
        level: 'Expert',
        instructor: 'Emily Chen',
        lastUpdated: 'Jan 2026',
        duration: '20 hours',
        rating: 4.7,
        enrollments: 500,
        thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2864&auto=format&fit=crop",
        modules: [
            { 
                id: 1, 
                title: 'Foundations of Design', 
                lessons: [
                    { id: 401, title: 'Color Theory', fileType: 'video', duration: '12:30' },
                    { id: 402, title: 'Typography Basics', fileType: 'document', duration: '2 MB' }
                ] 
            }
        ]
    }
];
