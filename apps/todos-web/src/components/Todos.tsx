import type { Todo as TodoType } from "@workspace/db-todos/types";

const Todo = ({ description }: TodoType) => {
  return <div>{description}</div>;
};

export interface TodosProps {
  todos: TodoType[] | "loading" | "error";
}

export const Todos = ({ todos }: TodosProps) => {
  if (todos === "loading") return <div>loading...</div>;
  else if (todos === "error") return <div>something went wrong</div>;
  return (
    <div>
      {todos.map((todo) => (
        <Todo key={todo.id} {...todo} />
      ))}
    </div>
  );
};
