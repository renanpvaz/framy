const createVNode = (name, textContentOrElementOrAttrs, ...children) => {
  const el = VNode(name);
  const type = typeof textContentOrElementOrAttrs;

  if ((type !== 'undefined' && textContentOrElementOrAttrs.tag) || type === 'string') {
    el.appendChild(textContentOrElementOrAttrs);
  } else if (type === 'object') {
    deepAssign(el.attributes, textContentOrElementOrAttrs);
  }

  children.forEach(child =>  el.appendChild(child));

  return el;
};

const div = (...args) => createVNode('div', ...args);
const h1 = (...args) => createVNode('h1', ...args);
const span = (...args) => createVNode('span', ...args);
const p = (...args) => createVNode('p', ...args);
const section = (...args) => createVNode('section', ...args);
const img = (...args) => createVNode('img', ...args);
const header = (...args) => createVNode('header', ...args);
const footer = (...args) => createVNode('footer', ...args);
const a = (...args) => createVNode('a', ...args);
const li = (...args) => createVNode('li', ...args);
const ul = (...args) => createVNode('ul', ...args);
const ol = (...args) => createVNode('ol', ...args);
const label = (...args) => createVNode('label', ...args);
const s = (...args) => createVNode('s', ...args);
const input = (...args) => createVNode('input', ...args);
const button = (...args) => createVNode('button', ...args);
