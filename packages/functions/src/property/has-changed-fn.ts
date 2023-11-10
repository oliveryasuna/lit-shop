/**
 * A function that checks if a value has changed.
 *
 * @typeParam Type - The type of the value.
 */
type HasChangedFn<Type> = ((value: Type, oldValue: Type) => boolean);

export default HasChangedFn;
export type {
  HasChangedFn
};
