import type AttributeType from './attribute-type';

/**
 * A function that deserializes an attribute value into a model value.
 *
 * @typeParam Model - The type of the model value.
 * @typeParam AttributeHint - The type to use to deserialize the attribute
 * value.
 *
 * @param attribute - The attribute value to deserialize, or `null` if the
 * attribute is not present.
 * @param typeHint - Optional. The type instance to use to deserialize the
 * attribute value.
 *
 * @returns The model value.
 */
type FromAttributeFn<Model = unknown, AttributeHint extends AttributeType = unknown> =
    ((attribute: (string | null), typeHint?: AttributeHint) => Model);

/**
 * A function that serializes a model value into an attribute value.
 *
 * @typeParam Model - The type of the model value.
 * @typeParam AttributeHint - The type to use to serialize the model value.
 *
 * @param model - The model value to serialize.
 * @param typeHint - Optional. The type instance to use to serialize the model
 * value.
 *
 * @returns The attribute value.
 */
type ToAttributeFn<Model = unknown, AttributeHint extends AttributeType = unknown> =
    ((model: Model, typeHint?: AttributeHint) => string);

/**
 * A converter that can be used to convert between attribute values and model
 * values, in the form of an object with `fromAttribute` and `toAttribute`
 * functions.
 *
 * @typeParam Model - The type of the model value.
 * @typeParam AttributeHint - The type to use to serialize and deserialize the
 * model value.
 */
type AttributeConverterObj<Model = unknown, AttributeHint extends AttributeType = unknown> = {
  /**
   * @see FromAttributeFn
   */
  fromAttribute: FromAttributeFn<Model, AttributeHint>,
  /**
   * @see ToAttributeFn
   */
  toAttribute: ToAttributeFn<Model, AttributeHint>
};

/**
 * A converter that can be used to convert between attribute values and model
 * values, in the form of a tuple with `fromAttribute` and `toAttribute`
 * functions.
 *
 * @typeParam Model - The type of the model value.
 * @typeParam AttributeHint - The type to use to serialize and deserialize the
 * model value.
 */
type AttributeConverterTuple<Model = unknown, AttributeHint extends AttributeType = unknown> = [
  (FromAttributeFn<Model, AttributeHint>),
  (ToAttributeFn<Model, AttributeHint>)
];

/**
 * A converter that can be used to convert between attribute values and model
 * values.
 *
 * @typeParam Model - The type of the model value.
 * @typeParam AttributeHint - The type to use to serialize and deserialize the
 * model value.
 *
 * @remarks
 *
 * This type is a union of {@link AttributeConverterObj} and
 * {@link AttributeConverterTuple}.
 *
 * @see AttributeConverterObj
 * @see AttributeConverterTuple
 */
type AttributeConverter<Model = unknown, AttributeHint extends AttributeType = unknown> =
    (AttributeConverterObj<Model, AttributeHint> | AttributeConverterTuple<Model, AttributeHint>);

export default AttributeConverter;
export type {
  FromAttributeFn,
  ToAttributeFn,
  AttributeConverterObj,
  AttributeConverterTuple,
  AttributeConverter
};
