'use client'; // Enables use of useState, useEffect, and interactivity

import React, { useEffect, useState } from "react";
import { fetchTodos, updateTodo } from "@/lib/api"; // Adjust path if needed
import TodoForm from "@/components/TodoForm";
import TodoCard from "@/components/TodoCard";
import "@/app/styles.css"; // Assuming styles are in globals.css or use your own path

const Home = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const loadTodos = async () => {
      const fetchedTodos = await fetchTodos();
      setTodos(fetchedTodos);
    };
    loadTodos();
  }, []);

  const handleAddTodo = (todoData) => {
    const newTodo = {
      id: Math.floor(Math.random() * 100),
      todo: todoData.todo,
      status: "pending",
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const handleStatusChange = (id, newStatus) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo || todo.status === newStatus) return;

    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...todo, status: newStatus } : t))
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = async (id, updatedData) => {
    try {
      const existingTodo = todos.find((t) => t.id === id);
      if (!existingTodo) return;

      const updatedTodo = await updateTodo(id, updatedData);
      const newTodo = { ...updatedTodo, status: existingTodo.status };

      setTodos((prev) => prev.map((todo) => (todo.id === id ? newTodo : todo)));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <div className="app">
      <h1 className="app-title">Trello Todo Board</h1>
      <TodoForm onAddTodo={handleAddTodo} />

      <div className="lane-container">
        {["pending", "in progress", "completed"].map((status) => (
          <div
            key={status}
            className="lane"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              const id = e.dataTransfer.getData("id");
              handleStatusChange(parseInt(id), status);
            }}
          >
            <h2 className="lane-title">{status}</h2>

            {todos
              .filter((todo) => todo.status === status)
              .map((todo) => (
                <TodoCard
                  key={todo.id}
                  todo={todo}
                  onDeleteTodo={handleDeleteTodo}
                  onEditTodo={handleEditTodo}
                />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
