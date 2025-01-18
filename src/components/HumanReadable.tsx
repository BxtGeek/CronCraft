import React from 'react';

interface HumanReadableProps {
  expression: string;
  isDark?: boolean;
}

export function HumanReadable({ expression, isDark }: HumanReadableProps) {
  const translateExpression = (expr: string): string => {
    const parts = expr.split(' ');
    if (parts.length !== 5) return 'Invalid cron expression';
    
    const [minute, hour, day, month, weekday] = parts;
    
    let description = 'Runs';

    // Every minute
    if (minute === '*' && hour === '*' && day === '*' && month === '*' && weekday === '*') {
      return 'Runs every minute';
    }

    // Minutes
    if (minute === '0' && hour === '*') {
      description += ' hourly at minute 0';
    } else if (minute === '*') {
      description += ' every minute';
    } else if (minute && minute.includes('/')) {
      const interval = minute.split('/')[1];
      description += ` every ${interval} minutes`;
    } else if (minute !== '*') {
      description += ` at minute ${minute}`;
    }

    // Hours
    if (hour !== '*') {
      if (hour === '0') description += ' at midnight';
      else if (hour === '12') description += ' at noon';
      else if (hour && hour.includes('/')) {
        const interval = hour.split('/')[1];
        description += ` every ${interval} hours`;
      } else description += ` at ${hour}:00`;
    }

    // Days
    if (day !== '*') {
      if (day === 'L') description += ' on the last day of the month';
      else if (day && day.includes('/')) {
        const interval = day.split('/')[1];
        description += ` every ${interval} days`;
      } else description += ` on day ${day} of the month`;
    }

    // Months
    if (month !== '*') {
      const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      if (month && month.includes('/')) {
        const interval = month.split('/')[1];
        description += ` every ${interval} months`;
      } else {
        const monthNum = parseInt(month) - 1;
        if (monthNum >= 0 && monthNum < 12) {
          description += ` in ${months[monthNum]}`;
        }
      }
    }

    // Weekdays
    if (weekday !== '*') {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      if (weekday && weekday.includes('-')) {
        const [start, end] = weekday.split('-');
        const startDay = days[parseInt(start)];
        const endDay = days[parseInt(end)];
        if (startDay && endDay) {
          description += ` from ${startDay} to ${endDay}`;
        }
      } else {
        const dayNum = parseInt(weekday);
        if (dayNum >= 0 && dayNum < 7) {
          description += ` on ${days[dayNum]}`;
        }
      }
    }

    return description;
  };

  return (
    <div className="prose prose-indigo">
      <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
        {translateExpression(expression)}
      </p>
    </div>
  );
}