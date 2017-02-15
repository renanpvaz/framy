const switchType = (value, cases) => {
  switch (typeof value) {
    case 'string':
      cases.string(value);
      break;
    case 'object':
      cases.object(value);
      break;
    case 'number':
      cases.number(value);
      break;
  }
};

const assignNested = (to, from) => {
  Object.keys(from).forEach(key => {
    if (typeof to[key] === 'object') {
      assignNested(to[key], from[key]);
    } else {
      to[key] = from[key];
    }
  });

  return to;
};

const append = (el, child) => {
  switchType(child, {
    object: element => el.appendChild(element),
    string: element => el.appendChild(
      document.createTextNode(child)
    ),
  });
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
const a = wrap('a');


div({ id: 'app' },
  header({ className: 'header' },
    h1({ className: 'header__title' }, 'Know It All'),
    a(
      {
        className: 'header__help',
        target: '_blank',
        rel: 'noopener noreferrer',
        title: 'Find out more about know it all',
        href: 'https://hackernoon.com/what-you-dont-know-about-web-development-d7d631f5d468#.ex2yp6d64',
      },
      'What is this?'
    )
  ),
  div({ className: 'skill-table' })
);
