import type PropertyMap from '../property/property-map';

type Renderer<Result> = {
  (properties: object): Result,
  properties?: PropertyMap
};

export default Renderer;
