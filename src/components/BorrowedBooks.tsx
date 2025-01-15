import React, { useState } from 'react';
import { BookOpen, X } from 'lucide-react';

export default function BorrowedBooks() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {isOpen ? (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-start justify-center pt-16 px-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-semibold">My Borrowed Books</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-500">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-4">
              <div className="divide-y">
                {/* Example borrowed books */}
                <div className="py-4">
                  <h3 className="font-medium">The Great Gatsby</h3>
                  <p className="text-sm text-gray-500">Due in 7 days</p>
                </div>
                <div className="py-4">
                  <h3 className="font-medium">1984</h3>
                  <p className="text-sm text-gray-500">Due in 3 days</p>
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
        <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600 mr-2 shrink-0" />
        <span className="text-sm font-medium text-gray-900 truncate">My Borrowed Books</span>
      </button>
    </div>
  );
}