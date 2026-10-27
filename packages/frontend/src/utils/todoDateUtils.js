export const getTodayKey = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const isValidDateKey = (value) => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value);

export const isTodoOverdue = (todo, todayKey = getTodayKey()) => {
  if (!todo || !todo.dueDate || todo.completed === 1 || todo.completed === true) {
    return false;
  }

  if (!isValidDateKey(todo.dueDate) || !isValidDateKey(todayKey)) {
    return false;
  }

  return todo.dueDate < todayKey;
};

export const getNextMidnightDelay = (now = new Date()) => {
  const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  return nextMidnight.getTime() - now.getTime();
};
