/**
 * Defines a base class for a web component.
 */
class WebComponent extends HTMLElement {

  public static get observedAttributes(): string[] {
    return [];
  }

  public constructor() {
    super();
  }

  public connectedCallback(): void {
    // NO-OP.
  }

  public disconnectedCallback(): void {
    // NO-OP.
  }

  public adoptedCallback(): void {
    // NO-OP.
  }

  public attributeChangedCallback(_attributeName: string, _oldValue: (string | null), _newValue: (string | null)): void {
    // NO-OP.
  }

}

export default WebComponent;
export {
  WebComponent
};
