import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Settings, LayoutDashboard, Library, Moon, Sun } from 'lucide-react';
import SettingsModal from './modals/SettingsModal';
import { useDarkMode } from '../contexts/DarkModeContext';

interface HeaderProps {
  userRole: 'admin' | 'member';
  onPageChange?: (page: 'dashboard' | 'books') => void;
  currentPage?: 'dashboard' | 'books';
}

export default function Header({ userRole, onPageChange, currentPage = 'dashboard' }: HeaderProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <>
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-7 w-7 sm:h-8 sm:w-8 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <div>
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white truncate">
                  Library System
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{userRole} Account</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {onPageChange && (
                <nav className="hidden md:flex space-x-1">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onPageChange('dashboard')}
                    className={`px-4 py-2 rounded-md flex items-center space-x-2 ${
                      currentPage === 'dashboard'
                        ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <LayoutDashboard className="h-5 w-5" />
                    <span>Dashboard</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onPageChange('books')}
                    className={`px-4 py-2 rounded-md flex items-center space-x-2 ${
                      currentPage === 'books'
                        ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Library className="h-5 w-5" />
                    <span>Books</span>
                  </motion.button>
                </nav>
              )}

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleDarkMode}
                className="p-1.5 sm:p-2 text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-200 transition-colors duration-200"
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5 sm:h-6 sm:w-6" />
                ) : (
                  <Moon className="h-5 w-5 sm:h-6 sm:w-6" />
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsSettingsOpen(true)}
                className="p-1.5 sm:p-2 text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-200 transition-colors duration-200"
              >
                <Settings className="h-5 w-5 sm:h-6 sm:w-6" />
              </motion.button>

              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="h-8 w-8 sm:h-9 sm:w-9 rounded-full ring-2 ring-white dark:ring-gray-700 overflow-hidden cursor-pointer"
              >
                <img
                  className="h-full w-full object-cover"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User avatar"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </header>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        userRole={userRole}
      />
    </>
  );
}