import WebComponent from './web-component';
import type ScheduledHook from './scheduled-hook';
import type FunctionalHtmlElement from './functional-html-element';

/**
 * Base class for functional elements.
 *
 * Will not work on its own.
 * Must be extended.
 */
abstract class FunctionalElementBase<Properties = {}> extends WebComponent implements FunctionalHtmlElement {

  protected constructor() {
    super();

    this._properties = ({} as any);

    this._scheduledPreRenderHooks = [];
    this._scheduledPostRenderHooks = [];
  }

  /**
   * Property values.
   */
  [propertyName: string]: unknown;

  /**
   * Property values.
   */
  protected readonly _properties: Properties;

  /**
   * The hooks that are called before the element is rendered.
   */
  protected readonly _scheduledPreRenderHooks: ScheduledHook[];

  /**
   * The hooks that are called after the element is rendered.
   */
  protected readonly _scheduledPostRenderHooks: ScheduledHook[];

  public override connectedCallback(): void {
    this.update();
  }

  public abstract override disconnectedCallback(): void;

  public abstract override attributeChangedCallback(attributeName: string, oldValue: (string | null), newValue: (string | null)): void;

  /**
   * Updates the element.
   */
  public abstract update(): void;

  /**
   * Renders the element.
   */
  protected abstract _render(): void;

  public schedulePreRenderHook(callback: () => void, synchronous: boolean): void {
    this._scheduledPreRenderHooks.push({
      callback: callback,
      synchronous: synchronous
    });
  }

  public schedulePostRenderHook(callback: () => void, synchronous: boolean): void {
    this._scheduledPostRenderHooks.push({
      callback: callback,
      synchronous: synchronous
    });
  }

}

export default FunctionalElementBase;
export {
  FunctionalElementBase
};
