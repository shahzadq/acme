export const getKeys = <O extends object>(object: O) =>
  typeof object === "object" ? (Object.keys(object) as (keyof O)[]) : [];

type Callback<O extends object, R, P = unknown> = (
  key: keyof O,
  value: O[keyof O],
  ...args: P[]
) => R;

export const mapKeys = <O extends object, R>(
  object: O,
  callback: Callback<O, R, number>,
) => getKeys(object).map((key, i) => callback(key, object[key], i));
