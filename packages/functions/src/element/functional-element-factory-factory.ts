import type FunctionalHtmlElement from './functional-html-element';
import type FunctionalElement from './functional-element';
import type {FromAttributeFn, PropertyDeclaration, ToAttributeFn} from '../property';
import FunctionalElementBase from './functional-element-base';
import type FunctionalElementOptions from './functional-element-options';
import type HookData from './hook-data';
import {AnyConstructor} from '../utils';

type CurrentInstance = {current: (FunctionalHtmlElement | null)};

const currentInstance: CurrentInstance = {current: null};

const getCurrentInstance = ((): (FunctionalHtmlElement | null) => currentInstance.current);

const setCurrentInstance = ((instance: (FunctionalHtmlElement | null)): void => {
  currentInstance.current = instance;
});

const DEFAULT_PROPERTY_DECLARATION: Required<PropertyDeclaration> = {
  attribute: true,
  converter: {
    fromAttribute: ((attribute: (string | null), typeHint?: unknown): unknown => {
      if(typeHint !== undefined) {
        switch(typeHint) {
          case Boolean:
            return (attribute !== null);
          case Number:
            return Number(attribute);
          case String:
            return attribute;
          default:
            return ((attribute !== null) ? JSON.parse(attribute) : null);
        }
      } else {
        return String(attribute);
      }
    }),
    toAttribute: ((model: unknown, typeHint?: unknown): string => {
      if(typeHint !== undefined) {
        switch(typeHint) {
          case Boolean:
          case Number:
          case String:
            return String(model);
          default:
            return JSON.stringify(model);
        }
      } else {
        return String(model);
      }
    })
  },
  hasChanged: ((value: unknown, oldValue: unknown): boolean => (value !== oldValue)),
  noAccessor: false,
  reflect: false,
  typeHint: String
};

type FunctionElementPropertyDeclaration<Model = unknown> = (PropertyDeclaration<Model> & {
  attributeName?: string,
  fromAttribute?: ((attribute: (string | null)) => Model),
  toAttribute?: ((model: Model) => string)
});

type FunctionalElementPropertyDeclarationDictionary = Record<string, FunctionElementPropertyDeclaration>;

const createPropertyDeclaration = ((propertyName: string, propertyDeclarationValue: PropertyDeclaration): FunctionElementPropertyDeclaration => {
  // Create the property declaration.
  const propertyDeclaration: FunctionElementPropertyDeclaration = {
    ...DEFAULT_PROPERTY_DECLARATION,
    ...propertyDeclarationValue
  };

  // Set the property name.
  if(propertyDeclaration.attribute) {
    propertyDeclaration.attributeName = ((typeof propertyDeclaration.attribute === 'string') ? propertyDeclaration.attribute : propertyName);
  }

  // Set the property converters.
  if(propertyDeclaration.converter) {
    if(Array.isArray(propertyDeclaration.converter)) {
      const fromAttribute: FromAttributeFn = propertyDeclaration.converter[0];
      const toAttribute: ToAttributeFn = propertyDeclaration.converter[1];

      propertyDeclaration.fromAttribute = ((attribute: (string | null)): unknown => fromAttribute(attribute, propertyDeclaration.typeHint));
      propertyDeclaration.toAttribute = ((model: unknown): string => toAttribute(model, propertyDeclaration.typeHint));
    } else {
      const fromAttribute: FromAttributeFn = propertyDeclaration.converter.fromAttribute;
      const toAttribute: ToAttributeFn = propertyDeclaration.converter.toAttribute;

      propertyDeclaration.fromAttribute = ((attribute: (string | null)): unknown => fromAttribute(attribute, propertyDeclaration.typeHint));
      propertyDeclaration.toAttribute = ((model: unknown): string => toAttribute(model, propertyDeclaration.typeHint));
    }
  }

  return propertyDeclaration;
});

const createPropertyDeclarations = (<RenderResult>(renderer: FunctionalElement<RenderResult, any>): FunctionalElementPropertyDeclarationDictionary => {
  const propertyDeclarations: FunctionalElementPropertyDeclarationDictionary = {};

  for(const [propertyName, propertyDeclarationValue] of Object.entries(renderer.properties ?? {})) {
    propertyDeclarations[propertyName] = createPropertyDeclaration(propertyName, propertyDeclarationValue);
  }

  return propertyDeclarations;
});

type FunctionalElementFactoryFactoryResult<RenderResult> =
    (<Properties = {}>(renderer: FunctionalElement<RenderResult, Properties>) => AnyConstructor<FunctionalHtmlElement>);

const functionalElementFactoryFactory = (<RenderResult>(
    render: ((element: FunctionalHtmlElement, source: RenderResult, options?: FunctionalElementOptions) => void)
): FunctionalElementFactoryFactoryResult<RenderResult> =>
    (<Properties = {}>(
        functionalElement: FunctionalElement<RenderResult, Properties>,
        options?: FunctionalElementOptions
    ): AnyConstructor<FunctionalHtmlElement> => {
      const propertyDeclarations: FunctionalElementPropertyDeclarationDictionary = createPropertyDeclarations(functionalElement);

      class FunctionalElementClass extends FunctionalElementBase<Properties> {

        public static override get observedAttributes(): string[] {
          return Object.values(propertyDeclarations)
              .filter((propertyDeclaration: FunctionElementPropertyDeclaration): boolean => Boolean(propertyDeclaration.attribute))
              .map((propertyDeclaration: FunctionElementPropertyDeclaration): string => propertyDeclaration.attributeName!);
        }

        public constructor() {
          super();

          this.ignoreAttributeChanges = false;

          this.__hookDatas = [];
          this.__hookCounter = -1;

          for(const [propertyName, propertyDeclaration] of Object.entries(propertyDeclarations)) {
            const attributeName: (string | undefined) = propertyDeclaration.attributeName;

            if(!attributeName || !this.hasAttribute(attributeName)) {
              continue;
            }

            (this._properties as any)[propertyName] = propertyDeclaration.fromAttribute!(this.getAttribute(attributeName));
          }
        }

        public ignoreAttributeChanges: boolean;

        private readonly __hookDatas: HookData[];

        private __hookCounter: number;

        public override disconnectedCallback(): void {
          // TODO: Cleanup?
        }

        public override attributeChangedCallback(attributeName: string, _oldValue: (string | null), newValue: (string | null)): void {
          if(this.ignoreAttributeChanges) {
            return;
          }

          const property: ([string, FunctionElementPropertyDeclaration] | undefined) = Object.entries(propertyDeclarations)
              .find(([_, propertyDeclaration]: [string, FunctionElementPropertyDeclaration]): boolean => (propertyDeclaration.attributeName === attributeName));

          if(!property) {
            return;
          }

          const [propertyName, propertyDeclaration]: [string, FunctionElementPropertyDeclaration] = property;

          if(propertyDeclaration.noAccessor) {
            return;
          }

          this[propertyName] = propertyDeclaration.fromAttribute!(newValue);
        }

        public override update(): void {
          // TODO: Does this work?
          setTimeout(this._render.bind(this), 0);
        }

        protected override _render(): void {
          this.__hookCounter = -1;

          setCurrentInstance(this);

          // Copy the properties in case they change during rendering.
          const properties: Properties = ({} as any);

          for(const [propertyName, propertyDeclaration] of Object.entries(propertyDeclarations)) {
            if(propertyDeclaration.noAccessor) {
              continue;
            }

            Object.defineProperty(
                properties,
                propertyName,
                {
                  get: ((): any => this[propertyName]),
                  set: ((value: any): void => {
                    this[propertyName] = value;
                  })
                }
            );
          }

          this.__executePreRenderHooks();

          render(this, functionalElement.call(this, properties), options);

          this.__executePostRenderHooks();
        }

        private __executePreRenderHooks(): void {
          for(const {callback, synchronous} of this._scheduledPreRenderHooks) {
            if(synchronous) {
              callback();
            } else {
              setTimeout(callback, 0);
            }
          }

          this._scheduledPreRenderHooks.length = 0;
        }

        private __executePostRenderHooks(): void {
          for(const {callback, synchronous} of this._scheduledPostRenderHooks) {
            if(synchronous) {
              callback();
            } else {
              setTimeout(callback, 0);
            }
          }

          this._scheduledPostRenderHooks.length = 0;
        }

        public override getHookData(): HookData {
          this.__hookCounter++;

          if(this.__hookDatas.length <= this.__hookCounter) {
            this.__hookDatas.push({});
          }

          return this.__hookDatas[this.__hookCounter]!;
        }

      }

      for(const [propertyName, propertyDeclaration] of Object.entries(propertyDeclarations)) {
        if(propertyDeclaration.noAccessor) {
          continue;
        }

        Object.defineProperty(
            FunctionalElementClass.prototype,
            propertyName,
            {
              get(): any {
                return this._properties[propertyName];
              },
              set(value: any): void {
                if(!propertyDeclaration.hasChanged!(value, this._properties[propertyName])) {
                  return;
                }

                if(propertyDeclaration.attribute && propertyDeclaration.reflect) {
                  this.ignoreAttributeChanges = true;

                  this.setAttribute(propertyDeclaration.attributeName!, propertyDeclaration.toAttribute!(value));

                  this.ignoreAttributeChanges = false;
                }

                this._properties[propertyName] = value;

                this.update();
              }
            }
        );
      }

      return FunctionalElementClass;
    }));

export default functionalElementFactoryFactory;
export type {
  CurrentInstance,
  FunctionElementPropertyDeclaration,
  FunctionalElementPropertyDeclarationDictionary,
  FunctionalElementFactoryFactoryResult
};
export {
  getCurrentInstance,
  setCurrentInstance,
  DEFAULT_PROPERTY_DECLARATION,
  createPropertyDeclarations,
  createPropertyDeclaration
};
