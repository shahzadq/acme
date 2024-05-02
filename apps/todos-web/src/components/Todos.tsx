import { Todo } from "@workspace/db-todos";

export const Todos = ({ todos }: { todos: Todo[] }) => {
  if (todos.length === 0) return <div>Create your first todo</div>;

  return (
    <div>
      <div>
        {todos.map(({ id }) => (
          <div key={id}></div>
        ))}
      </div>
      <div>new todo form</div>
    </div>
  );
};
