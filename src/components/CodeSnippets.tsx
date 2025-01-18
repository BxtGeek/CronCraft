import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeSnippetsProps {
  expression: string;
  isDark?: boolean;
}

export function CodeSnippets({ expression, isDark }: CodeSnippetsProps) {
  const [copied, setCopied] = useState(false);

  const snippet = `# Add to crontab\n${expression} /path/to/script.sh`;

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="flex justify-between items-center mb-2">
          <h3 className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Shell Command</h3>
          <button
            onClick={copyToClipboard}
            className={`${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
        <pre className={`rounded-md p-4 text-sm overflow-x-auto ${
          isDark ? 'bg-gray-900/50 text-gray-300' : 'bg-gray-50 text-gray-700'
        }`}>
          <code>{snippet}</code>
        </pre>
      </div>
    </div>
  );
}