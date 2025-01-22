import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { User } from '../types/user';
import UserTable from './UserTable';
import AddUserModal from './modals/AddUserModal';
import { validateEmail, validateName } from '../utils/validation';

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'member', isActive: true },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'admin', isActive: true },
  ]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showAddModal, setShowAddModal] = useState(false);

  const validateForm = (user: Partial<User>) => {
    const errors: Record<string, string> = {};
    
    if (!validateName(user.name || '')) {
      errors.name = 'Name is required';
    }
    
    if (!validateEmail(user.email || '')) {
      errors.email = 'Invalid email format';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleEditUser = (user: User) => {
    if (validateForm(user)) {
      setUsers(users.map(u => u.id === user.id ? user : u));
      setEditingUser(null);
      setFormErrors({});
    }
  };

  const handleAddUser = (userData: { name: string; email: string; role: 'admin' | 'member' }) => {
    const newUser: User = {
      id: Math.max(...users.map(u => u.id)) + 1,
      ...userData,
      isActive: true,
    };
    setUsers([...users, newUser]);
  };

  const handleDeactivateUser = (userId: number) => {
    if (window.confirm('Are you sure you want to deactivate this user?')) {
      setUsers(users.map(user => 
        user.id === userId ? { ...user, isActive: false } : user
      ));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all users in the library system including their name, email, and role.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add user
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <UserTable
                  users={users}
                  editingUser={editingUser}
                  formErrors={formErrors}
                  onEdit={setEditingUser}
                  onEditCancel={() => {
                    setEditingUser(null);
                    setFormErrors({});
                  }}
                  onEditSave={handleEditUser}
                  onDeactivate={handleDeactivateUser}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {showAddModal && (
        <AddUserModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddUser}
        />
      )}
    </div>
  );
}