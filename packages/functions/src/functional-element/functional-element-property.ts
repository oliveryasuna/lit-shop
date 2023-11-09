import type Property from '../property';

const ATTRIBUTE_NAME_SYMBOL: (unique symbol) = Symbol('attributeName');
const FROM_ATTRIBUTE_SYMBOL: (unique symbol) = Symbol('fromAttribute');
const TO_ATTRIBUTE_SYMBOL: (unique symbol) = Symbol('toAttribute');

type FunctionalElementProperty<Model = unknown> = (Property<Model> & {
  [ATTRIBUTE_NAME_SYMBOL]?: string,
  [FROM_ATTRIBUTE_SYMBOL]?: ((attribute: (string | null)) => Model),
  [TO_ATTRIBUTE_SYMBOL]?: ((value: Model) => string)
});

export default FunctionalElementProperty;
export {
  ATTRIBUTE_NAME_SYMBOL,
  FROM_ATTRIBUTE_SYMBOL,
  TO_ATTRIBUTE_SYMBOL
};
