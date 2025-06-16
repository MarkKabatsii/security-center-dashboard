// src/components/layout/admin/AdminLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from './AdminHeader'; // <-- Імпорт AdminHeader
import AdminSidebar from './AdminSidebar';
import useIsDesktop from "../../hooks/useIsDesktop.ts";
import useSidebarState from "../../hooks/useSidebarState.ts";
import classNames from "classnames"; // <-- Імпорт AdminSidebar
// import { DataProvider } from '../../../contexts/DataContext'; // <-- Якщо DataProvider глобальний, він вже в AppProviders

interface AdminLayoutProps {}

const AdminLayout: React.FC<AdminLayoutProps> = () => {
    const isDesktop = useIsDesktop();
    const { isSidebarOpen, toggleSidebar } = useSidebarState();

    return (
        <div className="flex min-h-screen bg-light-bg dark:bg-dark-bg">
            <AdminSidebar
            isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
            />

            <div
                className={classNames(
                    "flex-1 flex flex-col transition-all duration-300 ease-in-out",
                    {
                        "ml-64": isSidebarOpen && isDesktop,
                        "ml-[4.5rem]": !isSidebarOpen && isDesktop,
                        "ml-0": !isDesktop
                    }
                )}
            >
                <AdminHeader />
                <main className="flex-grow p-6">
                    <Outlet />
                </main>
            </div>
            {isSidebarOpen && !isDesktop && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={toggleSidebar}
                    role="presentation"
                    aria-hidden="true"
                ></div>
            )}
        </div>
    );
};

export default AdminLayout;