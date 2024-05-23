/**
 * Typesafe method to reduce an array of arrays to a single array
 * @example reduce([[1, 2], [3, 4]]) => [1, 2, 3, 4]
 * @param arr array of arrays
 * @returns typesafe single array
 */
export const reduce = <T>(arr: T[][]) => arr.reduce((a, v) => [...a, ...v]);

/**
 * Typesafe method to check if array includes - for some reason typescript expects the tbd to match the array item type (which isn't always guaranteed - which is why we're checking)
 * @param arr array to check
 * @param tbd what to check for
 * @returns normal arr.includes return (i.e. a boolean)
 */
export const includes = (arr: unknown[] | readonly unknown[], tbd: unknown) =>
  arr.includes(tbd);
