const store = {
  lastId: 0,
  listeners: {},

  triggerListener(key, payload) {
   const callback = this.listeners[key];

   if (callback) callback(payload);
 },

 register(callback) {
   const id = this.lastId + 1;
   this.listeners[id] = callback;
   this.lastId = id;

   return id;
 },
};

function Component(proto) {
  const base = {
    state: {},

    update(prevEl) {
      let wasSwapped = false;
      const nextEl = this.render();
      const hasChildren = nextEl.children.length > 0;

      if (hasChildren) {
        wasSwapped = this.updateMany(nextEl.childNodes, prevEl.childNodes);
      } else {
        wasSwapped = this.swapNodes(prevEl, nextEl);
      }

      if (wasSwapped) this.componentDidMount();

      return  wasSwapped && !hasChildren ? nextEl : prevEl;
    },

    updateMany(nextEls, prevEls) {
      const swaps = [].slice.call(nextEls).map(
        (next, i, arr) => !!this.swapNodes(prevEls[i], next)
      );

      return swaps.some(_ => _);
    },

    swapNodes(oldEl, newEl) {
      let areDifferent = !newEl.isEqualNode(oldEl);

      if (!areDifferent) {
        console.warn('render() was called but there was no change in the rendered output', newEl);
      } else if (!!oldEl) {
        requestAnimationFrame(() => oldEl.parentElement.replaceChild(newEl, oldEl));
      }

      return areDifferent;
    },

    setState(newState) {
      if (this.state === newState || !this.shouldComponentUpdate(newState)) return;

      this.state = Object.assign({}, this.state, newState);
      store.triggerListener(this.id);
    },

    componentDidMount() {},

    shouldComponentUpdate(newState) { return true; }
  };

  const component = Object.assign({}, base, proto);
  let el = component.render();

  component.componentDidMount();
  component.id = store.register(() => el = component.update(el));

  return el;
}
