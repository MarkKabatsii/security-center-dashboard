// src/components/layout/admin/AdminHeader.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from "../../ui/Button"; // <-- Перевірте цей шлях
import { LogOut, Fingerprint, Sun, Moon, ChevronDown } from "lucide-react";
import { useTheme } from '../../../contexts/ThemeContext'; // <-- Правильний шлях до ThemeContext

const AdminHeader: React.FC = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userPreferences');
        navigate('/login');
        console.log('Admin signing out...');
        setIsDropdownOpen(false);
    };

    return (
        <header
            className="bg-light-surface dark:bg-dark-surface p-4 shadow-md flex justify-between items-center border-b border-light-border dark:border-dark-border">
            <Link to="/admin/dashboard" className="text-2xl font-light text-light-accent dark:text-dark-accent">
                <div className="flex items-center">
                    <span className="mr-3 text-lg">
                        <Fingerprint className="stroke-light-accent dark:stroke-dark-accent" size={25} />
                    </span>
                    <h1 className="text-2xl font-bold text-light-text dark:text-dark-text">Admin Panel</h1>
                </div>
            </Link>

            <div className="flex-grow"></div>

            <div className="flex items-center space-x-4">
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full text-light-text dark:text-dark-text hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent"
                    aria-label="Toggle theme"
                >
                    {isDarkMode ? (
                        <Moon className="w-6 h-6" />
                    ) : (
                        <Sun className="w-6 h-6" />
                    )}
                </button>
                <div className="relative">
                    <Button
                        variant="ghost"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center space-x-2 text-dark-text dark:text-light-text hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-md"
                        aria-expanded={isDropdownOpen}
                        aria-haspopup="true"
                    >
                        <span className="font-medium">Admin User</span>
                        <ChevronDown className="w-4 h-4" />
                    </Button>

                    {isDropdownOpen && (
                        <div
                            className="absolute right-0 mt-2 w-48 bg-light-surface dark:bg-dark-surface rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="user-menu-button"
                        >
                            <Link to="/admin/profile"
                                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                                  role="menuitem">
                                Admin Profile
                            </Link>
                            <Link to="/admin/settings"
                                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                                  role="menuitem">
                                Admin Settings
                            </Link>
                            <Button
                                variant="ghost"
                                onClick={handleSignOut}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center justify-between"
                                role="menuitem"
                            >
                                Sign out <LogOut className="ml-2" size={16}/>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;