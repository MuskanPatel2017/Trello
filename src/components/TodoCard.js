'use client'; // Required for using useState and interactivity

import React, { useState } from "react";

// A single todo card that is draggable
// Destructuring the props
const TodoCard = ({ todo, onDeleteTodo, onEditTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.todo); //"todo" is the key in the object which has the title of todo

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onEditTodo(todo.id, { todo: editText });
    setIsEditing(false);
  };

  return (
    <div
      className="todo-card"
      draggable
      onDragStart={(e) => e.dataTransfer.setData("id", todo.id)}
    >
      {isEditing ? (
        <form onSubmit={handleEditSubmit} className="todo-form">
          <input
            type="text"
            className="input-field"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button type="submit" className="button button-add" style={{ marginBottom: '10px' }}>
            Save
          </button>
          <button type="button" className="button button-edit" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          <h3 className="todo-title">{todo.todo}</h3>
          <p className="todo-id">ID: {todo.id}</p>
          <button onClick={() => onDeleteTodo(todo.id)} className="button button-delete">
            Delete
          </button>
          <button onClick={() => setIsEditing(true)} className="button button-edit">
            Edit
          </button>
        </>
      )}
    </div>
  );
};

export default TodoCard;
