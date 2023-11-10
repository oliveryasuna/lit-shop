import type Dependency from '../hooks/utils/dependency';

/**
 * Hook data.
 */
type HookData = {
  // State.
  state?: any,
  setState?: ((state: (any | ((oldState: any) => any))) => void),

  // Effect.
  callback?: (() => (void | (() => void))),
  cleanup?: ((() => void) | null),
  dependencies?: (Dependency[] | null)
};

export default HookData;
export type {
  HookData
};
