import { getTodayKey, isTodoOverdue } from '../todoDateUtils';

describe('todoDateUtils', () => {
  it('returns the current local date key in YYYY-MM-DD format', () => {
    const now = new Date();
    const expected = [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, '0'),
      String(now.getDate()).padStart(2, '0'),
    ].join('-');

    expect(getTodayKey()).toBe(expected);
  });

  it('flags an incomplete item due before today as overdue', () => {
    const todayKey = getTodayKey();
    const overdueTodo = { id: 1, title: 'Late task', dueDate: '2000-01-01', completed: 0 };

    expect(isTodoOverdue(overdueTodo, todayKey)).toBe(true);
  });

  it('does not flag completed, undated, or due-today items as overdue', () => {
    const todayKey = getTodayKey();

    expect(isTodoOverdue({ id: 1, title: 'Done', dueDate: '2000-01-01', completed: 1 }, todayKey)).toBe(false);
    expect(isTodoOverdue({ id: 2, title: 'No date', dueDate: null, completed: 0 }, todayKey)).toBe(false);
    expect(isTodoOverdue({ id: 3, title: 'Today', dueDate: todayKey, completed: 0 }, todayKey)).toBe(false);
    expect(isTodoOverdue({ id: 4, title: 'Future', dueDate: '2099-12-31', completed: 0 }, todayKey)).toBe(false);
  });
});
