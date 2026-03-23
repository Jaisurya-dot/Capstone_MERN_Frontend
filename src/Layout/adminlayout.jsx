import React from 'react';
import SideNav from '../components/SideNav';
import TopBar from '../components/TopBar';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
    return (
        <div className="flex h-screen">
            <SideNav />    
            <div className="flex flex-col flex-1">
                <TopBar />
                <div className="p-6 bg-gray-100 flex-1 overflow-y-auto">
                    <Outlet />
                </div>

            </div>
        </div>
    );
};

export default DashboardLayout;