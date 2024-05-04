// this helper just removes some typescript issue where the tbd needs to match the array content type for some reason
export const arrayIncludes = (
  arr: unknown[] | readonly unknown[],
  tbd: unknown,
) => arr.includes(tbd);
