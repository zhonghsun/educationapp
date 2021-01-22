/** From A, subtract all properties that are present in B */
export type Subtract<A, B> = Pick<A, Exclude<keyof A, keyof B>>;
