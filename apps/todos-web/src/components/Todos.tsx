import { Todo } from "@workspace/db-todos";

export const Todos = ({ todos }: { todos: Todo[] }) => {
  if (todos.length === 0) return <div>Nothing to show</div>;

  return (
    <>
      {todos.map(({ id }) => (
        <div key={id}></div>
      ))}
    </>
  );
};
