// src/components/layout/AdminHeader.tsx
import React, {useState} from 'react';
import classNames from 'classnames';
import Button from '../../ui/Button.tsx';
import {Link} from "react-router-dom";
import SignOut from "../SignOut.tsx";

interface AdminHeaderProps {
    toggleTheme: () => void;
    isDarkMode: boolean;
}

// UA: Основний компонент заголовка, що містить інформацію про користувача, перемикач теми та випадаюче меню профілю.
// EN: The main header component containing user information, theme toggle, and a profile dropdown.
const AdminHeader: React.FC<AdminHeaderProps> = ({toggleTheme, isDarkMode}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    return (
        <header
            className="bg-light-surface dark:bg-dark-surface p-4 shadow-md flex justify-between items-center border-b border-light-border dark:border-dark-border">
            <Link to="/" className="text-2xl font-light text-light-accent dark:text-dark-accent">
                <div className="flex items-center">
                    <span className="mr-3 text-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none"
                             stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                             className="stroke-light-accent dark:stroke-dark-accent lucide lucide-fingerprint-icon lucide-fingerprint"><path
                            d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"/><path d="M14 13.12c0 2.38 0 6.38-1 8.88"/><path
                            d="M17.29 21.02c.12-.6.43-2.3.5-3.02"/><path d="M2 12a10 10 0 0 1 18-6"/><path
                            d="M2 16h.01"/><path
                            d="M21.8 16c.2-2 .131-5.354 0-6"/><path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2"/><path
                            d="M8.65 22c.21-.66.45-1.32.57-2"/><path d="M9 6.8a6 6 0 0 1 9 5.2v2"/></svg>
                    </span>
                    <h1 className="text-2xl font-bold text-light-text dark:text-dark-text">Security Center</h1>
                </div>
            </Link>

            {/* Пробіл для вирівнювання з правого краю */}
            <div className="flex-grow"></div>

            {/* Кнопка перемикання теми */}
            <div className="flex items-center space-x-4">
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full text-light-text dark:text-dark-text hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent"
                    aria-label="Toggle theme"
                >
                    {isDarkMode ? (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                        </svg>
                    ) : (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.459 4.293a1 1 0 00.707 1.707l.707-.707a1 1 0 00-1.707-.707l-.707.707zM17.293 8.707a1 1 0 000-1.414l-.707-.707a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414 0zM12 18a1 1 0 01-1 1v1a1 1 0 112 0v-1a1 1 0 01-1-1zM5.707 14.293a1 1 0 00-1.414 0l-.707.707a1 1 0 101.414 1.414l.707-.707a1 1 0 000-1.414zM4 10a1 1 0 01-1 1H2a1 1 0 110-2h1a1 1 0 011 1zM7.293 4.293a1 1 0 001.414 0l.707-.707a1 1 0 00-1.414-1.414l-.707.707a1 1 0 000 1.414z"></path>
                        </svg>
                    )}
                </button>

                {/* User Profile Dropdown - UA: Випадаюче меню профілю користувача */}
                {/* EN: User Profile Dropdown */}
                <div className="relative">
                    <Button
                        variant="ghost"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="focus:outline-none flex items-center space-x-2 text-dark-text dark:text-light-text hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-md"
                    >
                        <span className="font-medium">John Doe</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </Button>

                    {isDropdownOpen && (
                        <div
                            className={classNames(
                                'absolute right-0 mt-2 w-48 bg-light-bg dark:bg-dark-bg rounded-md shadow-lg z-10',
                                'ring-1 ring-black ring-opacity-5 focus:outline-none'
                            )}
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="user-menu-button"
                        >
                            <Link to="#"
                                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                                  role="menuitem">
                                <h5>Profile</h5>
                            </Link>
                            <Link to="#"
                                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                                  role="menuitem">
                                <h5>Settings</h5>
                            </Link>
                            <SignOut/>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;