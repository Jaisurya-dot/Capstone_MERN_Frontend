import React from 'react';

const HelpSection = () => {
    return (
        <section className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-2xl text-white shadow-xl shadow-blue-200 overflow-hidden relative animate-in fade-in duration-500 delay-300">
            <div className="relative z-10">
                <h3 className="font-bold text-lg mb-2 text-white">Need Help?</h3>
                <p className="text-blue-100 text-sm leading-relaxed mb-4">Check our Instructor Guide for tips on how to create engaging content.</p>
                <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-bold transition-colors text-white cursor-pointer">
                    View Guidelines
                </button>
            </div>
            {/* Decorative background element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        </section>
    );
};

export default HelpSection;
