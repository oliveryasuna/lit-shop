import type {Dependency} from '../utils';
import {shouldRun} from '../utils';
import type {FunctionalHtmlElement, HookData} from '../../element';
import {getCurrentInstance} from '../../element';

type UseMemoResult<T> = T;

const useMemo = (<T>(factory: (() => T), dependencies?: Dependency[]): UseMemoResult<T> => {
  const instance: FunctionalHtmlElement = getCurrentInstance()!;
  const data: HookData = instance.getHookData();

  if(!shouldRun(data, dependencies)) {
    return data.memo;
  }

  data.memo = factory();

  return data.memo;
});

export default useMemo;
export type {
  UseMemoResult
};
export {
  useMemo
};
