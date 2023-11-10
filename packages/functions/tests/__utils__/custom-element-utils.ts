import type AnyConstructor from '../../src/utils/any-constructor';

const bootstrapCustomElement = (<T extends HTMLElement>(tagName: string, ctor: AnyConstructor<T>, options?: ElementDefinitionOptions): T => {
  customElements.define(tagName, ctor, options);

  document.body.innerHTML = `<${tagName}></${tagName}>`;

  return document.querySelector(tagName)!;
});

export {
  bootstrapCustomElement
};
