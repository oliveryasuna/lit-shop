import type {FunctionalHtmlElement, HookData} from '../../element';
import {getCurrentInstance} from '../../element';

type UseStateResult<T> = [T, ((state: (T | ((oldState: T) => T))) => void)];

function useState<T>(initialState: (T | (() => T))): UseStateResult<T>;
function useState<T = undefined>(): UseStateResult<T | undefined>;
// eslint-disable-next-line func-style
function useState<T>(initialState?: (T | (() => T))): (UseStateResult<T> | UseStateResult<T | undefined>) {
  const instance: FunctionalHtmlElement = getCurrentInstance()!;
  const data: HookData = instance.getHookData();

  if(!('state' in data)) {
    if(initialState !== undefined) {
      data.state = (typeof initialState === 'function' ? (initialState as (() => T))() : initialState);
    }

    data.setState = ((state: T): void => {
      instance.schedulePreRenderHook(
          ((): void => {
            data.state = (typeof state === 'function' ? (state as ((oldState: T) => T))(data.state) : state);
          }),
          true
      );

      instance.update();
    });
  }

  return [data.state, data.setState!];
}

export default useState;
export type {
  UseStateResult
};
export {
  useState
};
