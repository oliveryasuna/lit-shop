import type Dependency from '../hooks/utils/dependency';

/**
 * Hook data.
 */
type HookData = {
  // State.
  state?: any,
  setState?: ((state: (any | ((oldState: any) => any))) => void),

  // TODO: Reducer.

  // TODO: Context.

  // Ref.
  ref?: any,

  // TODO: Imperative handle.

  // Effect.
  callback?: (() => (void | (() => void))),
  cleanup?: ((() => void) | null),
  dependencies?: (Dependency[] | null),

  // Memo.
  memo?: any
};

export default HookData;
export type {
  HookData
};
