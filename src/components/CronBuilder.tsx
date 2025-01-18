import React from 'react';
import { ManualInput } from './ManualInput';

interface CronBuilderProps {
  value: string;
  onChange: (expression: string) => void;
  onValidityChange: (isValid: boolean) => void;
  isDark?: boolean;
}

export function CronBuilder({ value, onChange, onValidityChange, isDark }: CronBuilderProps) {
  return (
    <div className="space-y-4">
      <ManualInput
        value={value}
        onChange={onChange}
        onValidityChange={onValidityChange}
        isDark={isDark}
      />
    </div>
  );
}