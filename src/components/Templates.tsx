import React from 'react';

interface TemplatesProps {
  onSelect: (expression: string) => void;
}

export function Templates({ onSelect }: TemplatesProps) {
  const templates = [
    {
      name: 'Every hour',
      description: 'Runs at the start of every hour',
      expression: '0 * * * *'
    },
    {
      name: 'Every day at midnight',
      description: 'Runs once per day at 12:00 AM',
      expression: '0 0 * * *'
    },
    {
      name: 'Every Sunday',
      description: 'Runs once per week on Sunday at midnight',
      expression: '0 0 * * 0'
    },
    {
      name: 'Every month',
      description: 'Runs on the first day of every month at midnight',
      expression: '0 0 1 * *'
    },
    {
      name: 'Every 15 minutes',
      description: 'Runs every quarter hour',
      expression: '*/15 * * * *'
    }
  ];

  return (
    <div className="space-y-4">
      {templates.map((template) => (
        <button
          key={template.name}
          onClick={() => onSelect(template.expression)}
          className="w-full text-left p-4 rounded-md border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
        >
          <h3 className="font-medium text-gray-900">{template.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{template.description}</p>
          <code className="block text-sm text-indigo-600 mt-2">{template.expression}</code>
        </button>
      ))}
    </div>
  );
}