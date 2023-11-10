import type PropertyDeclaration from './property-declaration';

/**
 * A map of property declarations.
 *
 * The keys are the property names.
 * The values are the property declarations.
 */
type PropertyDeclarationMap = Map<string, PropertyDeclaration>;

/**
 * Convenient type for a read-only map of property declarations.
 *
 * @see PropertyDeclarationMap
 */
type ReadonlyPropertyDeclarationMap = ReadonlyMap<string, PropertyDeclaration>;

export default PropertyDeclarationMap;
export type {
  PropertyDeclarationMap,
  ReadonlyPropertyDeclarationMap
};
