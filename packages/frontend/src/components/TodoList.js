import React from 'react';
import TodoCard from './TodoCard';
import { isTodoOverdue } from '../utils/todoDateUtils';

function TodoList({ todos, onToggle, onEdit, onDelete, isLoading, todayKey }) {
  if (todos.length === 0) {
    return (
      <div className="todo-list empty-state">
        <p className="empty-state-message">
          No todos yet. Add one to get started! 👻
        </p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          isOverdue={isTodoOverdue(todo, todayKey)}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
}

export default TodoList;
