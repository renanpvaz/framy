const attributesToImplicitSet = {
  value: true
};

const deepAssign = (to, from) => {
  Object.keys(from).forEach(key => {
    const toValue = to[key];
    const fromValue = from[key];

    if (typeof toValue === 'object' && !!toValue) {
      deepAssign(toValue, fromValue);
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
    deepAssign(el, textContentOrElementOrAttrs);
  }

  children.forEach(child =>  append(el, child));

  return el;
};
