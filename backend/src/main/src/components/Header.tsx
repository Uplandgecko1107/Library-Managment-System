import React from 'react';
import { BookOpen, Settings } from 'lucide-react';

interface HeaderProps {
  userRole: 'admin' | 'member';
}

export default function Header({ userRole }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <BookOpen className="h-7 w-7 sm:h-8 sm:w-8 text-indigo-600 shrink-0" />
            <div>
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">
                Library Dashboard
              </h1>
              <p className="text-sm text-gray-500 capitalize">{userRole} Account</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-500 transition-colors duration-200">
              <Settings className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
            <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full ring-2 ring-white overflow-hidden">
              <img
                className="h-full w-full object-cover"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="User avatar"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}