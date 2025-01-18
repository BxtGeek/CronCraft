import React from 'react';

interface SelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  isDark?: boolean;
}

export function Select({ label, value, onChange, options, isDark }: SelectProps) {
  return (
    <div>
      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`block w-full rounded-md shadow-sm text-sm ${
          isDark
            ? 'bg-gray-700 border-gray-600 text-white focus:border-indigo-500 focus:ring-indigo-500'
            : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
        }`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}