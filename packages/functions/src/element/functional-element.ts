import type {ReadonlyPropertyDeclarationDictionary} from '../property';

/**
 * A functional element.
 *
 * @typeParam Properties - The type of the properties.
 * @typeParam RenderResult - The type of the render result.
 */
type FunctionalElement<Properties = {}, RenderResult = unknown> = {
  /**
   * Renders a result based on the given properties.
   *
   * @param properties - The properties on which to base the result.
   */
  (properties: Properties): RenderResult,

  /**
   * The properties used by the renderer.
   */
  properties?: ReadonlyPropertyDeclarationDictionary
};

/**
 * Convenience alias for {@link FunctionalElement}.
 *
 * @typeParam Properties - The type of the properties.
 * @typeParam RenderResult - The type of the result.
 */
type FE<Properties = {}, RenderResult = unknown> = FunctionalElement<Properties, RenderResult>;

export default FunctionalElement;
export type {
  FunctionalElement,
  FE
};
