/**
 * The root element to which a render function should render.
 */
type RenderRoot = (HTMLElement | DocumentFragment);

/**
 * A function that renders a value to a root element.
 *
 * @typeParam Source The type of the source to render.
 *
 * @param source The source to render.
 * @param root The root element to which the value should be rendered.
 */
type RenderFn<Source> = ((source: Source, root: RenderRoot) => void);

export default RenderFn;
export type {
  RenderRoot,
  RenderFn
};
