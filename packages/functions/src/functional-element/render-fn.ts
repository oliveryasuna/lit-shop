type RenderRoot = (HTMLElement | ShadowRoot);

type RenderFn<RenderResult> = ((result: RenderResult, root: RenderRoot) => void);

export default RenderFn;
export type {
  RenderRoot
};
