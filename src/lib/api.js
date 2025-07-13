// lib/api.js (or utils/api.js)

const BASE = "https://dummyjson.com/todos";

// Fetch first 10 todos and add `status` based on `completed` field
export async function fetchTodos() {
  const res = await fetch(`${BASE}`);
  const data = await res.json();

  return data.todos.slice(0, 10).map((todo) => ({
    ...todo,
    status: todo.completed ? "completed" : "pending",
  }));
}

// Update a todo by ID with the given update fields
export async function updateTodo(id, updates) {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });

  const updated = await res.json();

  return {
    ...updated,
    status: updated.completed ? "completed" : updates.status,
  };
}
