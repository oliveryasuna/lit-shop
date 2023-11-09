import type AttributeType from './attribute-type';

type AttributeConverter<Model = unknown> = {
  fromAttribute: ((attribute: (string | null), type: AttributeType) => Model),
  toAttribute: ((value: Model, type: AttributeType) => string)
};

export default AttributeConverter;
