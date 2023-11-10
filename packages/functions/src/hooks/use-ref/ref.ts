import type MutableRef from './mutable-ref';

type Ref<T> = Required<MutableRef<T | null>>;

type ImmutableRef<T> = Ref<T>;

export default Ref;
export type {
  Ref,
  ImmutableRef
};
