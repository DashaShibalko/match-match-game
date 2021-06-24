export default function createElem(
  tagName: string,
  className: string,
  text: string,
) {
  const elem = document.createElement(`${tagName}`);
  elem.className = `${className}`;
  elem.innerText = text;
  return elem;
}
