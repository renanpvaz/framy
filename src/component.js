const store = {
  lastId: 0,
  listeners: {},
  root: null,

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

 setRoot(DOMNode) {
   this.root = DOMNode;
 }
};

function Component(proto) {
  const base = {
    state: {},

    update(oldTree) {
      const newTree = update(oldTree, this.render());
      
      this.componentDidMount();

      return newTree;
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
