export const isDefined = <T>(tbd?: T): tbd is T => typeof tbd !== "undefined";
