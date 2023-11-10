import type {HookData} from '../../src/___OLD';
import {CLEANUP_SYMBOL, GET_HOOK_DATA_SYMBOL, POST_RENDER_SYMBOL, UPDATE_SYMBOL} from '../../src/___OLD';

const mockInstance = ((): any => {
  const instance: any = {
    updateCount: 0,
    hookData: ({} as HookData),
    postRenderQueue: [],
    disconnectedCallback: ((): void => {
      const cleanup: ((() => void) | null) = instance.hookData[CLEANUP_SYMBOL];

      if(cleanup) {
        cleanup();
      }
    }),
    __render: ((): void => {
      for(const [callback, _isSynchronous] of instance.postRenderQueue) {
        callback();
      }

      instance.postRenderQueue = [];
    }),
    [GET_HOOK_DATA_SYMBOL]: ((): HookData => instance.hookData),
    [UPDATE_SYMBOL]: ((): void => {
      instance.updateCount++;
    }),
    [POST_RENDER_SYMBOL]: ((callback: (() => void), isSynchronous: boolean): void => {
      instance.postRenderQueue.push([callback, isSynchronous]);
    })
  };

  return instance;
});

export default mockInstance;
export {
  mockInstance
};
