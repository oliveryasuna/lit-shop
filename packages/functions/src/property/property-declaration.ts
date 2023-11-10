import type AttributeType from './attribute-type';
import type AttributeConverter from './attribute-converter';
import type HasChangedFn from './has-changed-fn';

/**
 * A property declaration.
 *
 * @typeParam Model - The type of the model value.
 * @typeParam AttributeHint - The type to use to serialize and deserialize the
 * model value.
 */
type PropertyDeclaration<Model = unknown, AttributeHint extends AttributeType = unknown> = {
  /**
   * Whether the property is associated with an attribute, or a name to use for
   * the attribute.
   *
   * If this is `true`, the attribute name will be the property name converted
   * to kebab-case.
   * If this is a string, the attribute name will be the string.
   * If this is `false` or `undefined`, the property will not be associated with
   * an attribute.
   *
   * @defaultValue `true`
   */
  attribute?: (boolean | string),
  /**
   * A converter that can be used to convert between attribute values and model
   * values.
   *
   * TODO: Add a link to the documentation for the default converter.
   * @defaultValue The default converter.
   */
  converter?: AttributeConverter<Model, AttributeHint>,
  /**
   * A function that determines whether the property has changed.
   *
   * TODO: Add a link to the documentation for the default function.
   * @defaultValue The default function.
   */
  hasChanged?: HasChangedFn<Model>,
  /**
   * Whether the property should not have an accessor.
   *
   * @defaultValue `false`
   */
  noAccessor?: boolean,
  /**
   * Whether the property should be reflected as an attribute.
   *
   * @defaultValue `false`
   */
  reflect?: boolean,
  /**
   * The type to use to serialize and deserialize the value.
   *
   * @defaultValue `String`
   */
  typeHint?: AttributeType
};

/**
 * Convenience type for a read-only property declaration.
 *
 * @typeParam Model - The type of the model value.
 * @typeParam AttributeHint - The type to use to serialize and deserialize the
 * value.
 *
 * @see PropertyDeclaration
 */
type ReadonlyPropertyDeclaration<Model = unknown, AttributeHint extends AttributeType = unknown> = Readonly<PropertyDeclaration<Model, AttributeHint>>;

export default PropertyDeclaration;
export type {
  PropertyDeclaration,
  ReadonlyPropertyDeclaration
};
