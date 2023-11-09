import type {RenderRoot} from './render-fn';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import RenderFn from './render-fn';
import type {CreateFunctionElementResult} from './create-functional-element';
import createFunctionalElement from './create-functional-element';
import type FunctionalElementOptions from './functional-element-options';

const functionalElement = (<RenderResult>(
    renderFn: RenderFn<RenderResult>,
    defaultOptions?: FunctionalElementOptions
): CreateFunctionElementResult<RenderResult> =>
    createFunctionalElement<RenderResult>((instance: HTMLElement, data: RenderResult, userOptions?: FunctionalElementOptions): void => {
      let target: RenderRoot = instance;

      const options: Required<FunctionalElementOptions> = {
        isUseShadowDom: true,
        ...(defaultOptions ?? {}),
        ...(userOptions ?? {})
      };

      if(options.isUseShadowDom) {
        target = (instance.shadowRoot ?? instance.attachShadow({mode: 'open'}));
      }

      renderFn(data, target);
    }));

export default functionalElement;
