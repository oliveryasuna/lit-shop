import type FunctionalElementOptions from './functional-element-options';
import type Renderer from './renderer';
import type FunctionalElementPropertyMap from './functional-element-property-map';
import type FunctionalElementProperty from './functional-element-property';
import {ATTRIBUTE_NAME_SYMBOL, FROM_ATTRIBUTE_SYMBOL, TO_ATTRIBUTE_SYMBOL} from './functional-element-property';
import type AttributeType from '../property/attribute-type';
import type Property from '../property';
import type HtmlFunctionalElement from './html-functional-element';

const PROPERTIES_SYMBOL: (unique symbol) = Symbol('properties');
const IS_IGNORE_ATTRIBUTE_CHANGES_SYMBOL: (unique symbol) = Symbol('isIgnoreAttributeChanges');
const UPDATE_SYMBOL: (unique symbol) = Symbol('update');

const DEFAULT_PROPERTY: Required<Property> = {
  attribute: true,
  converter: {
    fromAttribute: ((attribute: (string | null), type: AttributeType): unknown => {
      switch(type) {
        case Boolean:
          return (attribute !== null);
        case Number:
          return Number(attribute);
        case String:
          return attribute;
        default:
          return ((attribute !== null) ? JSON.parse(attribute) : null);
      }
    }),
    toAttribute: ((value: unknown, type: AttributeType): string => {
      switch(type) {
        case Boolean:
        case Number:
        case String:
          return String(value);
        default:
          return JSON.stringify(value);
      }
    })
  },
  hasChanged: ((value: unknown, previousValue: unknown): boolean => (value !== previousValue)),
  noAccessor: false,
  reflect: false,
  type: String
};

type CreateFunctionElementResult<RenderResult> = ((tagName: string, renderer: Renderer<RenderResult>, options?: FunctionalElementOptions) => void);

const createFunctionalElement = (<RenderResult>(
    renderFn: ((instance: HTMLElement, data: RenderResult, options?: FunctionalElementOptions) => void)
): CreateFunctionElementResult<RenderResult> =>
    ((tagName: string, renderer: Renderer<RenderResult>, options?: FunctionalElementOptions): void => {
      const properties: FunctionalElementPropertyMap = {};

      for(const [propertyName, propertyValue] of Object.entries(renderer.properties ?? {})) {
        // Create the property.
        const property: FunctionalElementProperty = {
          ...DEFAULT_PROPERTY,
          ...propertyValue
        };

        // Set the property name.
        if(property.attribute) {
          property[ATTRIBUTE_NAME_SYMBOL] = (typeof property.attribute === 'string') ? property.attribute : propertyName.toLowerCase();
        }

        // Set the property converters.
        if(property.converter !== undefined) {
          property[FROM_ATTRIBUTE_SYMBOL] = ((attribute: (string | null)): unknown => property.converter!.fromAttribute(attribute, property.type!));
          property[TO_ATTRIBUTE_SYMBOL] = ((value: unknown): string => property.converter!.toAttribute(value, property.type!));
        }

        // Register the property.
        properties[propertyName] = property;
      }

      class FunctionalElement extends HTMLElement implements HtmlFunctionalElement {

        [propertyName: string]: unknown;

        public static get observedAttributes(): string[] {
          return Object.values(properties)
              .filter((property: FunctionalElementProperty): boolean => Boolean(property.attribute))
              .map((property: FunctionalElementProperty): string => property[ATTRIBUTE_NAME_SYMBOL]!);
        }

        public constructor() {
          super();

          this[PROPERTIES_SYMBOL] = {};
          this[IS_IGNORE_ATTRIBUTE_CHANGES_SYMBOL] = false;
        }

        private readonly [PROPERTIES_SYMBOL]: Record<string, unknown>;

        private [IS_IGNORE_ATTRIBUTE_CHANGES_SYMBOL]: boolean;

        public connectedCallback(): void {
          this[UPDATE_SYMBOL]();
        }

        public disconnectedCallback(): void {
          // TODO: Implement.
        }

        public attributeChangedCallback(attributeName: string, _oldValue: (string | null), value: (string | null)): void {
          if(this[IS_IGNORE_ATTRIBUTE_CHANGES_SYMBOL]) {
            return;
          }

          const data: ([string, FunctionalElementProperty] | undefined) = Object.entries(properties)
              .find(([_, property]: [string, FunctionalElementProperty]) => property[ATTRIBUTE_NAME_SYMBOL] === attributeName);

          if(!data) {
            return;
          }

          const [propertyName, property]: [string, FunctionalElementProperty] = data;

          if(property.noAccessor) {
            return;
          }

          this[propertyName] = property[FROM_ATTRIBUTE_SYMBOL]!(value);
        }

        private [UPDATE_SYMBOL](): void {
          setTimeout(
              ((): void => {
                this.__render();
              }),
              0
          );
        }

        private __render(): void {
          const properties: Record<string, unknown> = {...this[PROPERTIES_SYMBOL]};

          renderFn(this, renderer.call(this, properties), options);
        }

      }

      for(const [propertyName, property] of Object.entries(properties)) {
        if(property.noAccessor) {
          continue;
        }

        Object.defineProperty(
            FunctionalElement.prototype,
            propertyName,
            {
              get(): any {
                return this[PROPERTIES_SYMBOL][propertyName];
              },
              set(value: any): void {
                if(!property.hasChanged!(value, this[propertyName])) {
                  return;
                }

                if(property.attribute && property.reflect) {
                  this[IS_IGNORE_ATTRIBUTE_CHANGES_SYMBOL] = true;
                  this.setAttribute(property[ATTRIBUTE_NAME_SYMBOL]!, property[TO_ATTRIBUTE_SYMBOL]!(value));
                  this[IS_IGNORE_ATTRIBUTE_CHANGES_SYMBOL] = false;
                }

                this[PROPERTIES_SYMBOL][propertyName] = value;

                this[UPDATE_SYMBOL]();
              }
            }
        );
      }

      customElements.define(tagName, FunctionalElement);
    }));

export default createFunctionalElement;
export type {
  CreateFunctionElementResult
};
export {
  PROPERTIES_SYMBOL,
  IS_IGNORE_ATTRIBUTE_CHANGES_SYMBOL,
  DEFAULT_PROPERTY
};
