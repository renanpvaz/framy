const NODE_REPLACE = 0;
const NODE_ADD = 1;
const NODE_REMOVE = 2;
const ATTR = 3;
const TEXT = 4;

function deepAssign(to, from) {
  Object.keys(from).forEach(key => {
    const toValue = to[key];
    const fromValue = from[key];

    if (typeof toValue === 'object' && !!toValue) {
      deepAssign(toValue, fromValue);
    } else {
      to[key] = fromValue;
    }
  });

  return to;
}
