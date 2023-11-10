import type MutableRef from './mutable-ref';
import type Ref from './ref';
import type {FunctionalHtmlElement, HookData} from '../../element';
import {getCurrentInstance} from '../../element';

type UseRefResult<T> = (MutableRef<T> | Ref<T> | MutableRef<T | undefined>);

function useRef<T>(initialValue: T): MutableRef<T>;
function useRef<T>(initialValue: (T | null)): Ref<T>;
function useRef<T = undefined>(): MutableRef<T | undefined>;
// eslint-disable-next-line func-style
function useRef<T>(initialValue?: (T | null)): UseRefResult<T> {
  const instance: FunctionalHtmlElement = getCurrentInstance()!;
  const data: HookData = instance.getHookData();

  if(!('ref' in data)) {
    data.ref = {current: initialValue};
  }

  return data.ref;
}

export default useRef;
export type {
  UseRefResult
};
export {
  useRef
};
