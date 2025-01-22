import React from 'react';
import { BookOpen, Users, BarChart3, Clock } from 'lucide-react';
import Header from './Header';
import StatCard from './StatCard';
import SearchBooks from './SearchBooks';
import BorrowedBooks from './BorrowedBooks';
import DueDates from './DueDates';
import AccountSettings from './AccountSettings';
import BookTable from './BookTable';

interface DashboardPageProps {
  userRole: 'admin' | 'member';
}

export default function DashboardPage({ userRole }: DashboardPageProps) {
  const stats = [
    { icon: BookOpen, title: "Total Books", value: "2,847" },
    { icon: Users, title: "Active Members", value: "1,439" },
    { icon: BarChart3, title: "Books Borrowed", value: "482" },
    { icon: Clock, title: "Overdue Returns", value: "12" }
  ];

  const recentBooks = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", status: "Available", dueDate: null },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", status: "Borrowed", dueDate: "2024-03-25" },
    { id: 3, title: "1984", author: "George Orwell", status: "Available", dueDate: null },
    { id: 4, title: "Pride and Prejudice", author: "Jane Austen", status: "Borrowed", dueDate: "2024-03-28" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userRole={userRole} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-4 sm:space-y-6 lg:space-y-8">
        {userRole === 'admin' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                icon={stat.icon}
                title={stat.title}
                value={stat.value}
              />
            ))}
          </div>
        )}

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <SearchBooks />
            <BorrowedBooks />
            <DueDates />
            <AccountSettings />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Available Books</h2>
          </div>
          <BookTable books={recentBooks} />
        </div>
      </main>
    </div>
  );
}