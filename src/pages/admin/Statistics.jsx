import React from 'react';

const Statistics = () => {
    const stats = [
        { label: 'Total Students', value: '12,450', trend: '+12% month', color: 'blue' },
        { label: 'Avg. Course Rating', value: '4.85', trend: '★★★★★', color: 'yellow' },
        { label: 'Total Revenue', value: '$45,210', trend: '+8.4% month', color: 'emerald' },
        { label: 'Active Mentors', value: '382', trend: 'Live Now', color: 'purple' }
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div>
                <h2 className="text-3xl font-extrabold text-blue-900 tracking-tight">Platform Insights</h2>
                <p className="text-gray-500 mt-1">Real-time performance metrics and student engagement data.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all group">
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1 group-hover:text-blue-500 transition-colors uppercase">{stat.label}</p>
                        <h3 className="text-3xl font-black text-gray-800 mb-2">{stat.value}</h3>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-500 bg-emerald-50 px-3 py-1.5 rounded-full w-fit">
                            {stat.trend}
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <h3 className="font-black text-gray-800 text-xl mb-6 flex items-center gap-2">
                        <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                        Top Performing Categories
                    </h3>
                    <div className="space-y-6">
                        {[
                            { name: 'Web Development', val: 85, color: 'bg-blue-500' },
                            { name: 'Data Science', val: 62, color: 'bg-emerald-500' },
                            { name: 'UI / UX Design', val: 45, color: 'bg-indigo-500' },
                            { name: 'Marketing', val: 30, color: 'bg-orange-500' }
                        ].map((item, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex justify-between text-sm font-bold text-gray-600 px-1">
                                    <span>{item.name}</span>
                                    <span>{item.val}%</span>
                                </div>
                                <div className="w-full h-3 bg-gray-50 rounded-full overflow-hidden">
                                    <div className={`h-full ${item.color} rounded-full transition-all duration-1000 delay-300`} style={{ width: `${item.val}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-slate-900 p-8 rounded-3xl shadow-2xl relative overflow-hidden group">
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-700"></div>
                    <h3 className="font-black text-white text-xl mb-2 relative z-10">Platform Growth Projections</h3>
                    <p className="text-slate-400 text-sm mb-8 relative z-10">Based on Q1 2026 organic user acquisition and retention rates.</p>
                    <div className="flex items-end gap-3 h-40 relative z-10">
                        {[40, 65, 55, 80, 70, 95, 85].map((h, i) => (
                            <div key={i} className="flex-1 bg-white/10 rounded-t-lg group-hover:bg-blue-500 transition-all duration-500 relative" style={{ height: `${h}%` }}>
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-bold text-white opacity-0 group-hover:opacity-100 transition-all">{h}%</div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-500 tracking-widest uppercase">
                        <span>Mon</span>
                        <span>Tue</span>
                        <span>Wed</span>
                        <span>Thu</span>
                        <span>Fri</span>
                        <span>Sat</span>
                        <span>Sun</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Statistics;
