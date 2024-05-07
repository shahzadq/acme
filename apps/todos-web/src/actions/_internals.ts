interface ActionReturn {
  type: "Success" | "Error";
  message: string;
}

export const createAction = <R extends ActionReturn, A>(
  fn: (...args: A[]) => Promise<R>,
) => fn;
