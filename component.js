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

function Component(proto) {
  const base = {
    id: proto.id,
    state: {},

    update(prevEl) {
      const nextEl = this.render();

      if (nextEl.children.length > 0) {
        this.updateMany(nextEl.childNodes, prevEl.childNodes);
      } else {
        this.swapNodes(prevEl, nextEl);
      }

      this.componentDidMount();

      return prevEl;
    },

    updateMany(nextEls, prevEls) {
      [].slice.call(nextEls).forEach((next, i, arr) => {
        this.swapNodes(prevEls[i], next);
      });
    },

    swapNodes(oldEl, newEl) {
      if (newEl.isEqualNode(oldEl)) {
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

    componentDidMount() {
      
    }
  };

  const component = Object.assign({}, base, proto);
  let el = component.render();

  component.componentDidMount();
  store.register(component.id, () => {
    requestAnimationFrame(() => el = component.update(el));
  });

  return el;
}
