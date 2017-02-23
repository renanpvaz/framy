function VNode(tag, attributes = {}) {
  return {
    tag,
    attributes,
    id: '0',
    children: [],

    appendChild(child) {
      this.children.push(
        typeof child === 'string' ? TextVNode(child) : child
      );
      this.bumpId();
    },

    bumpId() {
      this.children.forEach((child, i) => {
        child.setId(
          typeof child === 'string' ?
              this.id : this.id + '.' + i
        );
        child.bumpId();
      });
    },

    setId(id) {
      this.id = id;
    }
  }
}

function TextVNode(value) {
  const proto = {
    appendChild: undefined,
    id: undefined,
    tags: undefined
  };

  return Object.assign({ value }, VNode(''), proto)
}

function diff(a, b, parent) {
  if (a.tag !== b.tag) {
    return [
      { target: a.id, type: NODE, value: b }
    ];
  } else if (a.value !== b.value) {
    return [
      { target: a.id.substr(0, a.id.length - 2), type: TEXT, value: b.value }
    ];
  }

  let childrenPatches = [];
  const attrPatches = diffAttributes(a, b);

  a.children.forEach(
    (child, i) => childrenPatches = [...childrenPatches, ...diff(child, b.children[i])]
  );

  return [...attrPatches, ...childrenPatches];
}

function diffAttributes(treeA, treeB) {
  const patches = [];

  Object.keys(treeA.attributes).forEach(
    key => {
      if (treeA.attributes[key].toString() !== treeB.attributes[key].toString()) {
        patches.push({
          target: treeA.id,
          type: ATTR,
          value:{ [key]: treeB.attributes[key] }
        });
      }
    }
  );

  return patches;
}
