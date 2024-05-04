import type { Todo as TodoType } from "@workspace/db-todos/types";

const Todo = ({ description }: TodoType) => {
  return <div>{description}</div>;
};

export const Todos = ({ todos }: { todos: TodoType[] }) => (
  <div>
    {todos.length === 0 ? (
      <div>no todos</div>
    ) : (
      todos.map((todo) => <Todo key={todo.id} {...todo} />)
    )}
  </div>
);
