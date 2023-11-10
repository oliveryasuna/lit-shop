import type {PropertyDeclaration} from '../property';

/**
 * A functional element.
 *
 * @typeParam RenderResult - The type of the render result.
 * @typeParam Properties - The type of the properties.
 */
type FunctionalElement<RenderResult = unknown, Properties = {}> = {
  /**
   * Renders a result based on the given properties.
   *
   * @param properties - The properties on which to base the result.
   */
  (properties: Properties): RenderResult,

  /**
   * The properties used by the renderer.
   */
  properties?: Record<(keyof Properties), PropertyDeclaration>
};

/**
 * Convenience alias for {@link FunctionalElement}.
 *
 * @typeParam RenderResult - The type of the result.
 * @typeParam Properties - The type of the properties.
 */
type FE<RenderResult = unknown, Properties = {}> = FunctionalElement<RenderResult, Properties>;

export default FunctionalElement;
export type {
  FunctionalElement,
  FE
};
