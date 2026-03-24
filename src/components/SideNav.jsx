import { Link, useLocation } from 'react-router-dom';

const SideNav = () => {
    const location = useLocation();

    const navItems = [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Statistics', path: '/dashboard/statistics' },
        { name: 'Create Course', path: '/dashboard/create-course' },
        { name: 'Access User', path: '/dashboard/access-user' },
    ];

    return (
        <div className="w-64 bg-slate-900 text-white p-5">
            <h2 className="text-2xl font-bold mb-8">Instructor</h2>

            <ul className="space-y-3">
                {navItems.map((item) => (
                    <li key={item.path}>
                        <Link
                            to={item.path}
                            className={`block px-4 py-2 rounded ${location.pathname === item.path
                                    ? 'bg-blue-500'
                                    : 'hover:bg-slate-700'
                                }`}
                        >
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SideNav;