const attributesToImplicitSet = {
  value: true
};

const assignNested = (to, from) => {
  Object.keys(from).forEach(key => {
    const lowerCaseKey = key.toLowerCase();
    const toValue = to[lowerCaseKey];
    const fromValue = from[key];

    if (typeof toValue === 'object' && !!toValue) {
      assignNested(toValue, fromValue);
    } else if (!(key in attributesToImplicitSet)) {
      to[lowerCaseKey] = fromValue;
    } else {
      to.setAttribute(lowerCaseKey, fromValue);
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

  if (!!children) {
    children.forEach(child =>  append(el, child));
  }

  return el;
};

const wrap = elementName => (...args) => createElement(elementName, ...args);

const div = wrap('div');
const h1 = wrap('h1');
const span = wrap('span');
const p = wrap('p');
const section = wrap('section');
const img = wrap('img');
const header = wrap('header');
const footer = wrap('footer');
const a = wrap('a');
const li = wrap('li');
const ul = wrap('ul');
const label = wrap('label');
const s = wrap('s');
const input = wrap('input');
const button = wrap('button');
