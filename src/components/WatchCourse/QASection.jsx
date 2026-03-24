import React from 'react';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';

const QASection = ({
    newDoubt,
    setNewDoubt,
    onSubmitDoubt,
    doubts,
    setDoubts
}) => {

    // 👍 Like toggle
    const handleLike = (id) => {
        const updated = doubts.map(d => {
            if (d.id === id) {
                const isLiked = d.liked;
                return {
                    ...d,
                    liked: !isLiked,
                    votes: isLiked
                        ? (d.votes || 1) - 1
                        : (d.votes || 0) + 1
                };
            }
            return d;
        });

        setDoubts(updated);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newDoubt.trim()) return;
        onSubmitDoubt();
        setNewDoubt("");
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">

            {/* Header */}
            <h3 className="text-lg font-bold text-gray-800">
                Comments ({doubts.length})
            </h3>

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex gap-3 items-start">
                <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold">
                    U
                </div>

                <div className="flex-1">
                    <input
                        value={newDoubt}
                        onChange={(e) => setNewDoubt(e.target.value)}
                        placeholder="Write a comment..."
                        className="w-full px-4 py-2 border rounded-full text-sm outline-none focus:ring-2 focus:ring-purple-300"
                    />

                    <div className="flex justify-end mt-2">
                        <button
                            type="submit"
                            disabled={!newDoubt.trim()}
                            className="px-5 py-1.5 text-sm bg-purple-600 text-white rounded-full hover:bg-purple-700 disabled:opacity-50"
                        >
                            Comment
                        </button>
                    </div>
                </div>
            </form>

            {/* Comments */}
            <div className="space-y-5">
                {doubts.map((doubt) => (
                    <div key={doubt.id} className="flex gap-3">

                        {/* Avatar */}
                        <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-700">
                            {doubt.user?.[0] || "U"}
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                            <div className="bg-gray-100 rounded-2xl px-4 py-3">

                                {/* Name + time */}
                                <div className="flex items-center gap-2 text-xs mb-1">
                                    <span className="font-semibold text-gray-800">
                                        {doubt.user || "Anonymous"}
                                    </span>
                                    <span className="text-gray-400">
                                        {doubt.time || "now"}
                                    </span>
                                </div>

                                {/* Text */}
                                <p className="text-sm text-gray-700">
                                    {doubt.text}
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">

                                {/* 👍 Like */}
                                <button
                                    onClick={() => handleLike(doubt.id)}
                                    className={`flex items-center gap-1 transition ${doubt.liked ? "text-blue-600" : "hover:text-blue-600"
                                        }`}
                                >
                                    {doubt.liked ? (
                                        <AiFillLike size={14} />
                                    ) : (
                                        <AiOutlineLike size={14} />
                                    )}
                                    {doubt.votes || 0}
                                </button>

                                {/* Reply */}
                                <button className="hover:text-purple-600">
                                    Reply
                                </button>

                                <span>
                                    {doubt.replies || 0} replies
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default QASection;