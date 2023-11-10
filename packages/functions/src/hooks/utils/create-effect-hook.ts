import type Dependency from './dependency';
import type {FunctionalHtmlElement, HookData} from '../../element';
import {getCurrentInstance} from '../../element';
import shouldRun from './should-run';

type CreateEffectHookResult = ((callback: (() => (void | (() => void))), dependencies?: Dependency[]) => void);

const createEffectHook = ((synchronous: boolean): CreateEffectHookResult =>
    ((callback: (() => (void | (() => void))), dependencies?: Dependency[]): void => {
      const instance: FunctionalHtmlElement = getCurrentInstance()!;
      const data: HookData = instance.getHookData();

      if(!shouldRun(data, dependencies)) {
        return;
      }

      data.callback = callback;

      if(data.cleanup) {
        data.cleanup();

        data.cleanup = null;
      }

      instance.schedulePostRenderHook(
          ((): void => {
            data.cleanup = data.callback!()!;
          }),
          synchronous
      );
    }));

export default createEffectHook;
export type {
  CreateEffectHookResult
};
export {
  createEffectHook
};
