'use client'; // Required for client-side interactivity (e.g. useState)

import React, { useState } from "react";
import Link from 'next/link';

const TodoForm = ({ onAddTodo }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;

    const newTodo = {
      userId: Math.floor(Math.random() * 100),
      todo: title,
      status: "pending",
    };

    onAddTodo(newTodo);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        className="input-field"
        placeholder="Todo Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <button type="submit" className="button button-add">Add Todo</button>
      <Link href="/ssr-todos" className="button button-view-ssr">View SSR Todos</Link>
    </form>
  );
};

export default TodoForm;
