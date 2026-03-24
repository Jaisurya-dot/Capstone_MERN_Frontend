import { useState, useCallback } from 'react';

/**
 * Custom hook to manage states for the course watcher.
 * Handles engagement (likes/dislikes), doubts (Q&A), and study notes.
 * 
 * @returns {Object} - Engagement state and interaction handlers.
 */
export const useWatchState = () => {
    // Engagement State
    const [likes, setLikes] = useState(124);
    const [dislikes, setDislikes] = useState(4);
    const [isLiked, setIsLiked] = useState(false);
    
    // Interactions State
    const [activeTab, setActiveTab] = useState("doubts");
    const [notes, setNotes] = useState("");
    
    // Doubts (Q&A) State
    const [newDoubt, setNewDoubt] = useState("");
    const [doubts, setDoubts] = useState([
        { id: 1, user: 'Rahul K.', text: 'How does the recursion base case work here?', time: '2 mins ago', replies: 1, votes: 3 },
        { id: 2, user: 'Aman S.', text: 'Clear explanation! Thanks.', time: '10 mins ago', replies: 0, votes: 1 }
    ]);

    /**
     * Handles liking content.
     */
    const handleLike = useCallback(() => {
        if (!isLiked) {
            setLikes(prev => prev + 1);
            setIsLiked(true);
        }
    }, [isLiked]);

    /**
     * Handles disliking content.
     */
    const handleDislike = useCallback(() => {
        setDislikes(prev => prev + 1);
    }, []);

    /**
     * Submits a new doubt post.
     */
    const handleDoubtSubmit = useCallback(() => {
        if (!newDoubt.trim()) return;
        
        const freshDoubt = { 
            id: Date.now(), 
            user: 'You', 
            text: newDoubt, 
            time: 'Just now', 
            replies: 0, 
            votes: 0 
        };
        
        setDoubts(prev => [freshDoubt, ...prev]);
        setNewDoubt("");
    }, [newDoubt]);

    return {
        likes,
        dislikes,
        isLiked,
        activeTab,
        setActiveTab,
        notes,
        setNotes,
        doubts,
        setDoubts,
        newDoubt,
        setNewDoubt,
        handleLike,
        handleDislike,
        handleDoubtSubmit
    };
};
