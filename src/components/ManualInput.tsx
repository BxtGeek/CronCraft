import React, { useState, useRef, useEffect } from 'react';

interface ManualInputProps {
  value: string;
  onChange: (value: string) => void;
  onValidityChange: (isValid: boolean) => void;
  isDark?: boolean;
}

interface SyntaxGuide {
  title: string;
  examples: Array<{ value: string; description: string }>;
}

export function ManualInput({ value, onChange, onValidityChange, isDark }: ManualInputProps) {
  const [cursorPosition, setCursorPosition] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const syntaxGuides: Record<number, SyntaxGuide> = {
    0: {
      title: 'Minutes (0-59)',
      examples: [
        { value: '*', description: 'every minute' },
        { value: '0', description: 'at minute 0' },
        { value: '*/15', description: 'every 15 minutes' },
        { value: '0,30', description: 'at minute 0 and 30' },
        { value: '1-5', description: 'minutes 1 through 5' }
      ]
    },
    1: {
      title: 'Hours (0-23)',
      examples: [
        { value: '*', description: 'every hour' },
        { value: '0', description: 'at midnight' },
        { value: '*/2', description: 'every 2 hours' },
        { value: '9-17', description: 'business hours' },
        { value: '0,12', description: 'at midnight and noon' }
      ]
    },
    2: {
      title: 'Day of Month (1-31)',
      examples: [
        { value: '*', description: 'every day' },
        { value: '1', description: 'first day of month' },
        { value: '1,15', description: '1st and 15th' },
        { value: 'L', description: 'last day of month' },
        { value: '1-5', description: 'first five days' }
      ]
    },
    3: {
      title: 'Month (1-12)',
      examples: [
        { value: '*', description: 'every month' },
        { value: '*/3', description: 'every quarter' },
        { value: '1,6,12', description: 'Jan, Jun, Dec' },
        { value: '6-8', description: 'summer months' }
      ]
    },
    4: {
      title: 'Day of Week (0-6)',
      examples: [
        { value: '*', description: 'every day' },
        { value: '0', description: 'Sunday' },
        { value: '1-5', description: 'weekdays' },
        { value: '6,0', description: 'weekends' }
      ]
    }
  };

  const getCurrentPartIndex = (value: string, position: number): number => {
    const parts = value.substring(0, position).split(' ');
    return Math.min(parts.length - 1, 4);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    setCursorPosition(e.target.selectionStart || 0);
  };

  const handleClick = () => {
    setCursorPosition(inputRef.current?.selectionStart || 0);
  };

  const handleKeyUp = () => {
    setCursorPosition(inputRef.current?.selectionStart || 0);
  };

  const currentPartIndex = getCurrentPartIndex(value, cursorPosition);
  const currentGuide = syntaxGuides[currentPartIndex];

  return (
    <div className="space-y-4">
      <div>
        <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          Cron Expression
        </label>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onClick={handleClick}
          onKeyUp={handleKeyUp}
          className={`block w-full rounded-md shadow-sm text-sm ${
            isDark
              ? 'bg-gray-700 border-gray-600 text-white focus:border-indigo-500 focus:ring-indigo-500'
              : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
          }`}
          placeholder="Enter cron expression (e.g., * * * * *)"
        />
      </div>

      <div className={`p-4 rounded-md ${isDark ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
        <h3 className={`text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          {currentGuide.title}
        </h3>
        <div className="space-y-2">
          {currentGuide.examples.map((example) => (
            <div
              key={example.value}
              className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
            >
              <code className={`${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
                {example.value}
              </code>
              {' - '}
              {example.description}
            </div>
          ))}
        </div>
      </div>

      <div className={`p-4 rounded-md ${isDark ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
        <h3 className={`text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          Special Characters
        </h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className={isDark ? 'text-gray-400' : 'text-gray-600'}>* - any value</div>
          <div className={isDark ? 'text-gray-400' : 'text-gray-600'}>, - value list separator</div>
          <div className={isDark ? 'text-gray-400' : 'text-gray-600'}>- - range of values</div>
          <div className={isDark ? 'text-gray-400' : 'text-gray-600'}>/ - step values</div>
        </div>
      </div>
    </div>
  );
}