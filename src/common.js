const NODE = 0;
const ATTR = 1;
const TEXT = 2;


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
