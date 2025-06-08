// src/components/layout/Header.tsx
import React, {useState} from 'react';
import classNames from 'classnames';
import {useTheme} from '../../contexts/ThemeContext';
import Button from '../ui/Button';
import {SunIcon, MoonIcon} from '@heroicons/react/24/outline'
import {Fingerprint, LogOut} from "lucide-react";

/**
 * @component Header
 * @description The main header component containing user information, theme toggle, and a profile dropdown.
 */
// UA: Основний компонент заголовка, що містить інформацію про користувача, перемикач теми та випадаюче меню профілю.
// EN: The main header component containing user information, theme toggle, and a profile dropdown.
const Header: React.FC = () => {
    const {isDarkMode, toggleTheme} = useTheme();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleSignOut = () => {
        alert('Signing out...'); // UA: Імітація виходу з системи
        // EN: Simulate sign out
        setIsDropdownOpen(false);
    };

    return (
        <header
            className="flex items-center justify-between h-16 bg-light-bg dark:bg-dark-bg border-b border-light-border dark:border-dark-border px-6 shadow-sm">
            <div className="flex-1">
                {/* Placeholder for potential search bar or other elements */}
                <div className="flex items-center">
                    <span className="mr-3 text-lg">{<Fingerprint color="#f90101"/>}</span>

                    <h1 className="text-2xl font-bold text-light-text dark:text-dark-text">Security Center</h1>
                </div>
            </div>

            <div className="flex items-center space-x-4">
                {/* Theme Toggle - UA: Перемикач теми */}
                {/* EN: Theme Toggle */}
                <Button
                    variant="ghost"
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                    {isDarkMode ? <SunIcon className="h-6 w-6 border-b-0 text-gray-800 dark:text-gray-200"/> :
                        <MoonIcon className="h-6 w-6 text-gray-800 dark:text-gray-200"/>}
                </Button>

                {/* User Profile Dropdown - UA: Випадаюче меню профілю користувача */}
                {/* EN: User Profile Dropdown */}
                <div className="relative">
                    <Button
                        variant="ghost"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center space-x-2 text-dark-text dark:text-light-text hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-md"
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
                                'absolute right-0 mt-2 w-48 bg-light-bg dark:bg-dark-bg rounded-md shadow-lg py-1 z-10',
                                'ring-1 ring-black ring-opacity-5 focus:outline-none'
                            )}
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="user-menu-button"
                        >
                            <a href="#"
                               className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                               role="menuitem">
                                Profile
                            </a>
                            <a href="#"
                               className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                               role="menuitem">
                                Settings
                            </a>
                            <Button
                                variant="ghost"
                                onClick={handleSignOut}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                                role="menuitem"
                            >
                                Sign out <span className="ml-2"><LogOut/></span>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;