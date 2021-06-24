abstract class Component {
  protected constainer: HTMLElement;

  constructor(tagName: string, className: string) {
    this.constainer = document.createElement(tagName);
    this.constainer.className = className;
  }

  render() {
    return this.constainer;
  }
}

export default Component;
