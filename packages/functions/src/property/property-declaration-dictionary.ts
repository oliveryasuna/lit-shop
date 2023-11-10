import type PropertyDeclaration from './property-declaration';

/**
 * A dictionary of property declarations.
 *
 * The keys are the property names.
 * The values are the property declarations.
 */
type PropertyDeclarationDictionary = Record<string, PropertyDeclaration>;

/**
 * Convenience type for a read-only dictionary of property declarations.
 *
 * @see PropertyDeclarationDictionary
 */
type ReadonlyPropertyDeclarationDictionary = Readonly<PropertyDeclarationDictionary>;

export default PropertyDeclarationDictionary;
export type {
  PropertyDeclarationDictionary,
  ReadonlyPropertyDeclarationDictionary
};
