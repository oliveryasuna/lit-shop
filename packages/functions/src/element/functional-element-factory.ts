import type {RenderRoot} from './render-fn';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import RenderFn from './render-fn';
import type {FunctionalElementFactoryFactoryResult} from './functional-element-factory-factory';
import functionalElementFactoryFactory from './functional-element-factory-factory';
import type FunctionalElementOptions from './functional-element-options';

const functionalElementFactory = (<RenderResult>(
    render: RenderFn<RenderResult>,
    defaultOptions?: FunctionalElementOptions
): FunctionalElementFactoryFactoryResult<RenderResult> =>
    functionalElementFactoryFactory((element: HTMLElement, source: RenderResult, userOptions?: FunctionalElementOptions): void => {
      const options: Required<FunctionalElementOptions> = {
        useShadowDom: true,
        ...(defaultOptions ?? {}),
        ...(userOptions ?? {})
      };

      const target: RenderRoot = (options.useShadowDom ? (element.shadowRoot ?? element.attachShadow({mode: 'open'})) : element);

      render(source, target);
    }));

export default functionalElementFactory;
export {
  functionalElementFactory
};
