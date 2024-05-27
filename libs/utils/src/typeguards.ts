/**
 * Tyepguard to ensure value is defined
 * @example [1, 2, undefined, 3].filter(isDefined) => [1, 2, 3]
 */
export const isDefined = <T>(tbd?: unknown): tbd is T =>
  typeof tbd !== "undefined";

/**
 * Typeguard to ensure value is string
 * @example ["1", 2, undefined, "a"].filter(isString) => ["1", "a"]
 */
export const isString = (tbd?: unknown): tbd is string =>
  typeof tbd === "string";
