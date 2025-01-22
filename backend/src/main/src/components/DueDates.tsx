import React, { useState } from 'react';
import { Clock, X } from 'lucide-react';

export default function DueDates() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {isOpen ? (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-start justify-center pt-16 px-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-semibold">Due Dates</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-500">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-medium text-yellow-800">Due Soon</h3>
                  <ul className="mt-2 space-y-2">
                    <li className="text-sm text-yellow-700">The Great Gatsby - Due in 2 days</li>
                  </ul>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-medium text-red-800">Overdue</h3>
                  <ul className="mt-2 space-y-2">
                    <li className="text-sm text-red-700">1984 - Overdue by 1 day</li>
                  </ul>
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
        <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600 mr-2 shrink-0" />
        <span className="text-sm font-medium text-gray-900 truncate">Due Dates</span>
      </button>
    </div>
  );
}