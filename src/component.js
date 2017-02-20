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
      const nextEl = this.render();
      const wasSwapped = this.swapNodes(prevEl, nextEl);

      if (wasSwapped) this.componentDidMount();

      return wasSwapped ? nextEl : prevEl;
    },

    swapNodes(oldEl, newEl) {
      const areEqual = newEl.isEqualNode(oldEl);

      if (!areEqual && !!oldEl) {
        oldEl.parentElement.replaceChild(newEl, oldEl);
      }

      return !areEqual;
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
