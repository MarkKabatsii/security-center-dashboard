// src/components/layout/Client/ClientLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import ClientNavbar from './ClientNavbar.tsx';
import ClientSidebar from './ClientSidebar.tsx';
import classNames from 'classnames';
import useIsDesktop from "../../hooks/useIsDesktop.ts";     // <-- Оновлений шлях
import useSidebarState from "../../hooks/useSidebarState"; // <-- Оновлений шлях (тепер існує!)

interface ClientLayoutProps {}

const ClientLayout: React.FC<ClientLayoutProps> = () => {
    const isDesktop = useIsDesktop();
    const { isSidebarOpen, toggleSidebar } = useSidebarState();

    return (
        <div className="flex min-h-screen bg-light-bg dark:bg-dark-bg">
            <ClientSidebar
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
                <ClientNavbar />
                <main className="flex-1 p-6">
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

export default ClientLayout;