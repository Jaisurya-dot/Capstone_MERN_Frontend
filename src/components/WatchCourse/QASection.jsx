import React, { useState } from 'react';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';

const QASection = ({
    newDoubt,
    setNewDoubt,
    onSubmitDoubt,
    doubts,
    setDoubts
}) => {

    const [activeReplyId, setActiveReplyId] = useState(null);
    const [replyText, setReplyText] = useState("");

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

    // 💬 Add reply
    const handleReplySubmit = (id) => {
        if (!replyText.trim()) return;

        const updated = doubts.map(d => {
            if (d.id === id) {
                return {
                    ...d,
                    repliesList: [
                        ...(d.repliesList || []),
                        {
                            id: Date.now(),
                            text: replyText,
                            user: "You",
                            time: "now"
                        }
                    ],
                    replies: (d.replies || 0) + 1
                };
            }
            return d;
        });

        setDoubts(updated);
        setReplyText("");
        setActiveReplyId(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newDoubt.trim()) return;
        onSubmitDoubt();
        setNewDoubt("");
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">

            <h3 className="text-lg font-bold text-gray-800">
                Comments ({doubts.length})
            </h3>

            {/* Main Input */}
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
                            className="px-5 py-1.5 text-sm bg-purple-600 text-white rounded-full"
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

                        <div className="flex-1">

                            {/* Comment */}
                            <div className="bg-gray-100 rounded-2xl px-4 py-3">
                                <div className="flex items-center gap-2 text-xs mb-1">
                                    <span className="font-semibold text-gray-800">
                                        {doubt.user || "Anonymous"}
                                    </span>
                                    <span className="text-gray-400">
                                        {doubt.time || "now"}
                                    </span>
                                </div>

                                <p className="text-sm text-gray-700">
                                    {doubt.text}
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">

                                {/* Like */}
                                <button
                                    onClick={() => handleLike(doubt.id)}
                                    className={`flex items-center gap-1 ${doubt.liked ? "text-blue-600" : "hover:text-blue-600"}`}
                                >
                                    {doubt.liked ? <AiFillLike size={14} /> : <AiOutlineLike size={14} />}
                                    {doubt.votes || 0}
                                </button>

                                {/* Reply Button */}
                                <button
                                    onClick={() => setActiveReplyId(doubt.id)}
                                    className="hover:text-purple-600"
                                >
                                    Reply
                                </button>

                                <span>{doubt.replies || 0} replies</span>
                            </div>

                            {/* 👉 Reply Input (Right side feel) */}
                            {activeReplyId === doubt.id && (
                                <div className="mt-3 ml-6 flex gap-2">
                                    <input
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        placeholder="Write a reply..."
                                        className="flex-1 px-3 py-1.5 text-sm border rounded-full outline-none focus:ring-2 focus:ring-purple-300"
                                    />
                                    <button
                                        onClick={() => handleReplySubmit(doubt.id)}
                                        className="text-sm bg-purple-600 text-white px-3 rounded-full"
                                    >
                                        Send
                                    </button>
                                </div>
                            )}

                            {/* 🔽 Replies List */}
                            <div className="mt-3 space-y-3 ml-6">
                                {doubt.repliesList?.map((reply) => (
                                    <div key={reply.id} className="flex gap-2">
                                        <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold">
                                            {reply.user[0]}
                                        </div>

                                        <div className="bg-gray-50 px-3 py-2 rounded-xl">
                                            <div className="text-[10px] text-gray-500">
                                                {reply.user} • {reply.time}
                                            </div>
                                            <p className="text-xs text-gray-700">
                                                {reply.text}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QASection;