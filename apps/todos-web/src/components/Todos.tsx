import type { List, Todo as TodoType } from "@workspace/db-todos/types";

interface TodoAndList extends TodoType {
  list: List | null;
}

const Todo = ({ description }: TodoAndList) => {
  return <div>{description}</div>;
};

export const Todos = ({ todos }: { todos: TodoAndList[] }) => {
  return (
    <div>
      {todos.map((todo) => (
        <Todo key={todo.id} {...todo} />
      ))}
    </div>
  );
};
