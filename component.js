const specialAttrs = {
  'INPUT': 'value'
};

const store = {
  listeners: {},

  triggerListener(key, payload) {
   const callback = this.listeners[key];

   if (callback) callback(payload);
 },

 register(id, callback) {
   if (!callback || typeof callback !== `function`) {
     console.warn(`You must pass a function as the second argument to store.listen()`);
   }

   this.listeners[id] = callback;
 },
};

function Component(config) {
  const proto = {
    id: config.id,
    state: {},

    update(prevEl) {
      const nextEl = this.render();

      if (nextEl.hasChildNodes) {
        this.updateMany(nextEl.childNodes, prevEl.childNodes);
      } else {
        this.swapNodes(prevEl, nextEl);
      }

      return prevEl;
    },

    updateMany(nextEls, prevEls) {
      [].slice.call(nextEls).forEach((next, i, arr) => {
        this.swapNodes(prevEls[i], next);
      });
    },

    swapNodes(oldEl, newEl) {
      if (newEl.isEqualNode(oldEl) && newEl.value === oldEl.value) {
        console.warn('render() was called but there was no change in the rendered output', newEl);
      } else if (!!oldEl) {
        oldEl.parentElement.replaceChild(newEl, oldEl);
      }
    },

    setState(newState) {
      if (this.state === newState) return;

      this.state = Object.assign({}, this.state, newState);
      store.triggerListener(this.id);
    },
  };

  const component = Object.assign({}, proto, config);
  let el = component.render();

  store.register(component.id, () => {
    requestAnimationFrame(() => el = component.update(el));
  });

  return el;
}
