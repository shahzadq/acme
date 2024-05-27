/**
 * Extract string keys from object keys
 * @example StringKeyOf<{ 1: 1, "a": 1, "b": 1 }> => "a" | "b"
 */
export type StringKeyOf<O extends object> = Extract<keyof O, string>;

/**
 * Pick keys in object to be required
 * @example RequireKeys<{ name?: string; age?: number }, "name"> => { name: string, age?: number }
 */
export type RequireKeys<O extends object, K extends keyof O> = O &
  Required<Pick<O, K>>;
