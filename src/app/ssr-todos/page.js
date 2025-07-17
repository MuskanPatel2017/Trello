// app/ssr-todos/page.jsx

import styles from './SSRPage.css';
import Link from 'next/link';

export const metadata = {
  title: "SSR Todos",
};

export default async function SSRPage() {
  const res = await fetch("https://dummyjson.com/todos?limit=10", {
    cache: "no-store",
  });
  const data = await res.json();

  console.log("ssr",data);

  return (
    <main className={styles.wrapper}>
      <h1 className={styles.title}>Server-Side Rendered Todos</h1>
      <p className={styles.timestamp}>
        <strong>Rendered at:</strong> {new Date().toLocaleString()}
      </p>
      <ul className={styles.todoList}>
        {data.todos.map((todo) => (
          <li key={todo.id} className={styles.todoItem}>
             {todo.todo}
          </li>
        ))}
      </ul>
      <Link href="/" className="button">Back to Home Screen</Link>
    </main>
  );
}
