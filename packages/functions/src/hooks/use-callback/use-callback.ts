import type {Dependency} from '../utils';
import type {UseMemoResult} from '../use-memo';
import {useMemo} from '../use-memo';

type UseCallbackResult<T> = UseMemoResult<T>;

const useCallback = (<T extends Function>(callback: T, dependencies?: Dependency[]): UseCallbackResult<T> => useMemo(((): T => callback), dependencies));

export default useCallback;
export type {
  UseCallbackResult
};
export {
  useCallback
};
