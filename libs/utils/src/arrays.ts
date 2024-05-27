/**
 * Typesafe method to reduce an array of arrays to a single array
 * @example reduce([[1, 2], [3, 4]]) => [1, 2, 3, 4]
 */
export const reduce = <T>(arr: T[][]) => arr.reduce((a, v) => [...a, ...v]);

/**
 * Typesafe method to check if array includes - for some reason typescript expects the tbd to match the array item type (which isn't always guaranteed - which is why we're checking in the first place)
 * @example includes([1, 2], 1) => true
 */
export const includes = (arr: unknown[] | readonly unknown[], tbd: unknown) =>
  arr.includes(tbd);
