import { db } from "@workspace/db-todos";

export default async function HomePage() {
  const todos = await db.query.todoSchema.findMany();

  return (
    <main>
      <h1>All Todo's</h1>
      {todos.length > 0 ? (
        todos.map((todo) => <div key={todo.id}>{todo.description}</div>)
      ) : (
        <div>No todos</div>
      )}
    </main>
  );
}
