import React from 'react';
import { Edit, UserMinus } from 'lucide-react';
import { User } from '../types/user';

interface UserTableProps {
  users: User[];
  editingUser: User | null;
  formErrors: Record<string, string>;
  onEdit: (user: User) => void;
  onEditCancel: () => void;
  onEditSave: (user: User) => void;
  onDeactivate: (userId: number) => void;
}

export default function UserTable({
  users,
  editingUser,
  formErrors,
  onEdit,
  onEditCancel,
  onEditSave,
  onDeactivate
}: UserTableProps) {
  return (
    <table className="min-w-full divide-y divide-gray-300">
      <thead className="bg-gray-50">
        <tr>
          <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
            Name
          </th>
          <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
            Email
          </th>
          <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
            Role
          </th>
          <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
            Status
          </th>
          <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
            <span className="sr-only">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {users.map((user) => (
          <tr key={user.id}>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
              {editingUser?.id === user.id ? (
                <div>
                  <input
                    type="text"
                    value={editingUser.name}
                    onChange={e => onEdit({ ...editingUser, name: e.target.value })}
                    className={`block w-full rounded-md shadow-sm sm:text-sm ${
                      formErrors.name ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-xs text-red-600">{formErrors.name}</p>
                  )}
                </div>
              ) : (
                user.name
              )}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              {editingUser?.id === user.id ? (
                <div>
                  <input
                    type="email"
                    value={editingUser.email}
                    onChange={e => onEdit({ ...editingUser, email: e.target.value })}
                    className={`block w-full rounded-md shadow-sm sm:text-sm ${
                      formErrors.email ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-xs text-red-600">{formErrors.email}</p>
                  )}
                </div>
              ) : (
                user.email
              )}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                user.role === 'admin' 
                  ? 'bg-purple-100 text-purple-800' 
                  : 'bg-green-100 text-green-800'
              }`}>
                {user.role}
              </span>
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                user.isActive
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {user.isActive ? 'Active' : 'Inactive'}
              </span>
            </td>
            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
              {editingUser?.id === user.id ? (
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => onEditSave(editingUser)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Save
                  </button>
                  <button
                    onClick={onEditCancel}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => onEdit(user)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDeactivate(user.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <UserMinus className="h-4 w-4" />
                  </button>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}