import type HookData from './hook-data';

/**
 * The public API of functional elements.
 */
type FunctionalHtmlElement = (HTMLElement & {
  /**
   * Updates the element.
   */
  update: (() => void),

  /**
   * Gets hook data.
   *
   * @returns The hook data.
   */
  getHookData: (() => HookData),

  /**
   * Schedules a hook to be called before the element is rendered.
   */
  schedulePreRenderHook: ((callback: (() => void), synchronous: boolean) => void),
  /**
   * Schedules a hook to be called after the element is rendered.
   */
  schedulePostRenderHook: ((callback: (() => void), synchronous: boolean) => void)
});

export default FunctionalHtmlElement;
export type {
  FunctionalHtmlElement
};
