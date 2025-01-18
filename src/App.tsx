import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Check, Copy, Code, BookOpen, Wand2, Sun, Moon } from 'lucide-react';
import { CronBuilder } from './components/CronBuilder';
import { CronValidator } from './components/CronValidator';
import { HumanReadable } from './components/HumanReadable';
import { CodeSnippets } from './components/CodeSnippets';
import { Templates } from './components/Templates';

function App() {
  const [cronExpression, setCronExpression] = useState('* * * * *');
  const [isValid, setIsValid] = useState(true);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDark ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-50'}`}>
      <header className={`${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className={`h-6 w-6 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
            <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>CronCraft</h1>
          </div>
          <div className="flex items-center space-x-6">
            <nav className="flex space-x-4">
              <a href="#templates" className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Templates</a>
              <a href="#validator" className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Validator</a>
              <a href="#snippets" className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Code Snippets</a>
            </nav>
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-full ${isDark ? 'text-yellow-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-8">
            <section className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6`}>
              <div className="flex items-center space-x-2 mb-4">
                <Calendar className={`h-5 w-5 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
                <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Schedule Builder</h2>
              </div>
              <CronBuilder
                value={cronExpression}
                onChange={setCronExpression}
                onValidityChange={setIsValid}
                isDark={isDark}
              />
            </section>

            <section className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6`}>
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className={`h-5 w-5 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
                <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Human Readable</h2>
              </div>
              <HumanReadable expression={cronExpression} isDark={isDark} />
            </section>
          </div>

          <div className="space-y-8">
            <section id="templates" className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6`}>
              <div className="flex items-center space-x-2 mb-4">
                <Wand2 className={`h-5 w-5 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
                <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Templates</h2>
              </div>
              <Templates onSelect={setCronExpression} isDark={isDark} />
            </section>

            <section id="validator" className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6`}>
              <div className="flex items-center space-x-2 mb-4">
                <Check className={`h-5 w-5 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
                <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Validator</h2>
              </div>
              <CronValidator expression={cronExpression} isDark={isDark} />
            </section>

            <section id="snippets" className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6`}>
              <div className="flex items-center space-x-2 mb-4">
                <Code className={`h-5 w-5 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
                <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Code Snippets</h2>
              </div>
              <CodeSnippets expression={cronExpression} isDark={isDark} />
            </section>
          </div>
        </div>
      </main>

      <footer className={`${isDark ? 'bg-gray-800' : 'bg-white'} mt-12`}>
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className={`text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            CronCraft - Simplifying Cron Schedules
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;