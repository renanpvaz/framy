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
