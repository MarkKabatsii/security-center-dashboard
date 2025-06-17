
import React, { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar.tsx';
import AdminHeader from './AdminHeader.tsx';
import useIsDesktop from "../../hooks/useIsDesktop.ts";
import classNames from "classnames";
import {Outlet} from "react-router-dom";
/**
 * @interface AdminLayoutProps
 * @description Props for the AdminLayout component.
 */
// Props for the AdminLayout component.
interface AdminLayoutProps {
    toggleTheme: () => void;
    isDarkMode: boolean;
}
// The main application layout component, including the sidebar and header.
// It provides the overall structure for the application pages.
const AdminLayout: React.FC<AdminLayoutProps> = ({ toggleTheme, isDarkMode }) => {
    const isDesktop = useIsDesktop();

    // isSidebarOpen: true = open, false = closed
    const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
        // By default, if on a desktop, the sidebar should be open.
        // We only check localStorage if the user has minimized it.
        if (typeof window !== 'undefined' && window.innerWidth >= 768) { // Перевірка window.innerWidth на початковому рендері
            const savedState = localStorage.getItem('isSidebarOpen');
            // If there is a saved state, we use it. If there is not, or it is false,
            // and we are on the desktop, then by default we open (true).
            return savedState ? JSON.parse(savedState) : true;
        }
        return false; // Collapsed by default on mobile
    });

    // Sidebar adaptation effect when resizing the window
    useEffect(() => {
        if (isDesktop) {
            // If we switch to the desktop:
            // Restore the sidebar state from localStorage or set to true (expanded)
            const savedState = localStorage.getItem('isSidebarOpen');
            setIsSidebarOpen(savedState ? JSON.parse(savedState) : true);
        } else {
            // If we switch to mobile:
            // Sidebar is always completely hidden (false)
            setIsSidebarOpen(false);
        }
    }, [isDesktop]); // Depends on isDesktop

    const toggleSidebar = () => {
        setIsSidebarOpen((prev: boolean) => {
            const newState = !prev;
            if (isDesktop) { // We save state only for desktops
                localStorage.setItem('isSidebarOpen', JSON.stringify(newState));
            }
            // On mobile (when !isDesktop), toggle Sidebar simply opens/closes it,
            // localStorage is not used for them.
            return newState;
        });
    };

    return (
        <div className="flex h-screen overflow-hidden bg-light-bg dark:bg-dark-bg">
            <AdminSidebar
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
            />
            <div className={classNames(
                "flex-1 flex flex-col transition-all duration-300 ease-in-out",
                {
                    "ml-64": isSidebarOpen && isDesktop,
                    "ml-[4.5rem]": !isSidebarOpen && isDesktop,
                    "ml-0": !isDesktop
                }
            )}>
                <AdminHeader toggleTheme={toggleTheme}
                             isDarkMode={isDarkMode}/>
                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </div>
            {isSidebarOpen && !isDesktop && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={toggleSidebar}
                ></div>
            )}
        </div>
    );
};

export default AdminLayout;