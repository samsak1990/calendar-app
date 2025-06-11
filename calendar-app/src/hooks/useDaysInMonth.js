import { useMemo } from 'react';

const useDaysInMonth = (month, year) => {
  return useMemo(() => {
    const days = [];

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstDay = (firstDayOfMonth.getDay() + 6) % 7;

  const prevMonthLastDate = new Date(year, month, 0).getDate();

  for (let i = firstDay - 1; i >= 0; i--) {
    days.push(new Date(year, month - 1, prevMonthLastDate - i));
  }

  for (let d = 1; d <= lastDayOfMonth.getDate(); d++) {
    days.push(new Date(year, month, d));
  }

  const remaining = 7 - (days.length % 7);
  if (remaining < 7) {
    for (let i = 1; i <= remaining; i++) {
      days.push(new Date(year, month + 1, i));
    }
  }

  return days;
  }, [month, year]);
};

export default useDaysInMonth;