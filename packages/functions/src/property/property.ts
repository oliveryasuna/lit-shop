import type AttributeConverter from './attribute-converter';
import type HasChanged from './has-changed';
import type AttributeType from './attribute-type';

type Property<Model = unknown> = {
  attribute?: (boolean | string),
  converter?: AttributeConverter<Model>,
  hasChanged?: HasChanged<Model>,
  noAccessor?: boolean,
  reflect?: boolean,
  type?: AttributeType
};

export default Property;
