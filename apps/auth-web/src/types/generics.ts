export type StringKeyOf<O extends object> = Extract<keyof O, string>;
