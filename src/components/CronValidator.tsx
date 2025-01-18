import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface CronValidatorProps {
  expression: string;
}

export function CronValidator({ expression }: CronValidatorProps) {
  const validate = (expr: string): { isValid: boolean; message: string } => {
    try {
      const parts = expr.split(' ');
      if (parts.length !== 5) {
        return { isValid: false, message: 'Expression must have 5 parts' };
      }
      // Add more validation logic here
      return { isValid: true, message: 'Valid Cron expression' };
    } catch (error) {
      return { isValid: false, message: 'Invalid Cron expression' };
    }
  };

  const result = validate(expression);

  return (
    <div className={`p-4 rounded-md ${result.isValid ? 'bg-green-50' : 'bg-red-50'}`}>
      <div className="flex items-center">
        {result.isValid ? (
          <CheckCircle className="h-5 w-5 text-green-400" />
        ) : (
          <AlertCircle className="h-5 w-5 text-red-400" />
        )}
        <p className={`ml-2 text-sm ${result.isValid ? 'text-green-700' : 'text-red-700'}`}>
          {result.message}
        </p>
      </div>
    </div>
  );
}