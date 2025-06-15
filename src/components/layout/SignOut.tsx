// src/components/layout/sidebar/SidebarFooter.tsx
import React from 'react';

const SidebarFooter: React.FC = () => {

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userPreferences');
        localStorage.setItem('isSidebarOpen', JSON.stringify(true));
        alert('Goodbye!');
    };

    return (
        <button className={"flex justify-between w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"}
                onClick={handleLogout}>
            <h5>
                Logout
            </h5>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"
                     className="lucide lucide-log-out-icon lucide-log-out">
                    <path d="m16 17 5-5-5-5"/>
                    <path d="M21 12H9"/>
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                </svg>
            </div>
        </button>
    );
};

export default SidebarFooter;