const attributesToImplicitSet = {
  value: true
};

const assignNested = (to, from) => {
  Object.keys(from).forEach(key => {
    const toValue = to[key];
    const fromValue = from[key];

    if (typeof toValue === 'object' && !!toValue) {
      assignNested(toValue, fromValue);
    } else if (!(key in attributesToImplicitSet)) {
      to[key] = fromValue;
    } else {
      to.setAttribute(key, fromValue);
    }
  });

  return to;
};

const append = (el, child) => {
  switch (typeof child) {
    case 'object':
      el.appendChild(child);
      break;
    case 'string':
      el.appendChild(
        document.createTextNode(child)
      );
      break;
  }
};

const createElement = (name, textContentOrElementOrAttrs, ...children) => {
  const el = document.createElement(name);
  const type = typeof textContentOrElementOrAttrs;

  if (textContentOrElementOrAttrs instanceof Element || type === 'string') {
    append(el, textContentOrElementOrAttrs);
  } else if (typeof textContentOrElementOrAttrs === 'object') {
    assignNested(el, textContentOrElementOrAttrs);
  }

  children.forEach(child =>  append(el, child));

  return el;
};

const div = (...args) => createElement('div', ...args)
const h1 = (...args) => createElement('h1', ...args)
const span = (...args) => createElement('span', ...args)
const p = (...args) => createElement('p', ...args)
const section = (...args) => createElement('section', ...args)
const img = (...args) => createElement('img', ...args)
const header = (...args) => createElement('header', ...args)
const footer = (...args) => createElement('footer', ...args)
const a = (...args) => createElement('a', ...args)
const li = (...args) => createElement('li', ...args)
const ul = (...args) => createElement('ul', ...args)
const ol = (...args) => createElement('ol', ...args)
const label = (...args) => createElement('label', ...args)
const s = (...args) => createElement('s', ...args)
const input = (...args) => createElement('input', ...args)
const button = (...args) => createElement('button', ...args)
