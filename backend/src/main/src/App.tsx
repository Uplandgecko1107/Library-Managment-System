import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';

interface User {
  email: string;
  role: 'admin' | 'member';
}

function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return <DashboardPage userRole={user.role} />;
}

export default App;