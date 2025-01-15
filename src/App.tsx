import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';
import BooksManagementPage from './components/BooksManagementPage';
import { User } from './types/user';
import { DarkModeProvider } from './contexts/DarkModeContext';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'books'>('dashboard');

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handlePageChange = (page: 'dashboard' | 'books') => {
    setCurrentPage(page);
  };

  return (
    <DarkModeProvider>
      {!user ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <AnimatePresence mode="wait">
          {currentPage === 'dashboard' ? (
            <DashboardPage 
              key="dashboard"
              userRole={user.role} 
              onPageChange={handlePageChange}
            />
          ) : (
            <BooksManagementPage 
              key="books"
              userRole={user.role}
              onPageChange={handlePageChange}
            />
          )}
        </AnimatePresence>
      )}
    </DarkModeProvider>
  );
}

export default App;