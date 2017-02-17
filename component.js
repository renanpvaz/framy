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
      let wasSwapped = false;
      const nextEl = this.render();
      const hasChildren = nextEl.children.length > 0;

      if (hasChildren) {
        wasSwapped = this.updateMany(nextEl.childNodes, prevEl.childNodes);
      } else {
        wasSwapped = this.swapNodes(prevEl, nextEl);
      }

      if (wasSwapped) {
        this.componentDidMount();
      }

      return wasSwapped && !hasChildren ? nextEl : prevEl;
    },

    updateMany(nextEls, prevEls) {
      const nextElements = [].slice.call(nextEls);
      let hasSwapped;

      nextElements.forEach((next, i, arr) => {
        hasSwapped = this.swapNodes(prevEls[i], next) && hasSwapped !== false;
      });

      return hasSwapped;
    },

    swapNodes(oldEl, newEl) {
      let areEqual = newEl.isEqualNode(oldEl);

      if (areEqual) {
        console.warn('render() was called but there was no change in the rendered output', newEl);
      } else if (!!oldEl) {
        oldEl.parentElement.replaceChild(newEl, oldEl);
      }

      return !areEqual;
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
  store.register(component.id, () => el = component.update(el));

  return el;
}
