/**
 * Typesafe method to reduce array of objects to a single object
 * @example reduce([{ 1: "a" }, { 2: "b" }]) => { 1: "a", 2: "b" }
 * @param arr array of objects to reduce
 * @returns typesafe single object
 */
export const reduce = <O extends object>(arr: O[]) =>
  arr.reduce((a, v) => ({ ...a, ...v }));

/**
 * Typesafe method to extract keys from an object
 * @example getKeys({ 1: "a", 2: "b" }) => [1, 2]
 * @returns typesafe array of object keys
 */
export const getKeys = <O extends object>(object: O) =>
  (typeof object === "object" ? Object.keys(object) : []) as (keyof O)[];

/**
 * Typesafe method to map over object keys with typesafe args provided in the map fn
 * @example mapKeys({ 1: "a", 2: "b" }, (key, value, idx) => ({ key, value, idx })) => [{ key: 1, value: "a", idx: 0 }, { key: 2, value: "b", idx: 1 }]
 * @param object object with keys to map over
 * @param mapFn map function with extra value arg
 * @returns result of map fn
 */
export const mapKeys = <O extends object, R>(
  object: O,
  mapFn: (key: keyof O, value: O[keyof O], idx: number) => R,
) => getKeys(object).map((key, i) => mapFn(key, object[key], i));

/**
 * Typesafe method to filter out object keys with typesafe args provided in the filter fn
 * @example filterKeys({ 1: "a", 2: "b" }, (key, value, idx) => key !== 2) => [1]
 * @param object object with keys to filter
 * @param filterFn filter function with extra value arg
 * @returns result of filter fn
 */
export const filterKeys = <O extends object>(
  object: O,
  filterFn: (key: keyof O, value: O[keyof O], idx: number) => boolean,
) => getKeys(object).filter((key, i) => filterFn(key, object[key], i));
