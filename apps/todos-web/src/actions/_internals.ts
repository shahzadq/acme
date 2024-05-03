type ActionReturn = {
  type: "Success" | "Error";
  message: string;
};

export const createAction = <
  R extends ActionReturn,
  F extends (...args: any[]) => R | Promise<R>,
>(
  fn: F,
) => fn;
