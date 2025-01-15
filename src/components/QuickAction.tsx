import React from 'react';
import { LucideIcon } from 'lucide-react';

interface QuickActionProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
}

export default function QuickAction({ icon: Icon, label, onClick }: QuickActionProps) {
  return (
    <button 
      onClick={onClick}
      className="flex items-center justify-center p-4 bg-white shadow rounded-lg hover:bg-gray-50 transition-colors duration-200 w-full"
    >
      <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600 mr-2 shrink-0" />
      <span className="text-sm font-medium text-gray-900 truncate">{label}</span>
    </button>
  );
}