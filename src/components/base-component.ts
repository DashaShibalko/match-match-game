export class BaseComponent {
  readonly element: HTMLElement;

  constructor(
    tag: keyof HTMLElementTagNameMap = 'div',
    className: string = '',
  ) {
    this.element = document.createElement(tag);
    this.element.className = className;
  }
}
