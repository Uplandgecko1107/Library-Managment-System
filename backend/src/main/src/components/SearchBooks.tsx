import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBooks() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="relative">
      {isOpen ? (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-start justify-center pt-16 px-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-semibold">Search Books</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-500">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by title, author, or ISBN..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <div className="mt-4 max-h-96 overflow-y-auto">
                {/* Search results would go here */}
                <div className="text-gray-500 text-center py-4">
                  Start typing to search for books...
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center p-4 bg-white shadow rounded-lg hover:bg-gray-50 transition-colors duration-200 w-full"
      >
        <Search className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600 mr-2 shrink-0" />
        <span className="text-sm font-medium text-gray-900 truncate">Search Books</span>
      </button>
    </div>
  );
}