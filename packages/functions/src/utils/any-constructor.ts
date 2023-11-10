// TODO: Probably belongs elsewhere.
type AnyConstructor<T> = (new(...args: any[]) => T);

export default AnyConstructor;
export type {
  AnyConstructor
};
