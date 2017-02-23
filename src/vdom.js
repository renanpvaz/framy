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

function diff(a, b) {
  if (!a && !!b) {
    return [
      { target: b.id.substr(0, b.id.length - 2), type: NODE_ADD, value: b }
    ];
  } else if (!!a && !b) {
    return [
      { target: a.id, type: NODE_REMOVE }
    ];
  }

  if (a.tag !== b.tag) {
    return [
      { target: a.id, type: NODE_REPLACE, value: b }
    ];
  } else if (a.value !== b.value) {
    return [
      { target: a.id.substr(0, a.id.length - 2), type: TEXT, value: b.value }
    ];
  }

  const attrPatches = diffAttributes(a, b);
  let childrenPatches = [];
  let length = b.children.length > a.children.length ? b.children.length : a.children.length;

  for (let i = 0; i < length; i++) {
    childrenPatches = [...childrenPatches, ...diff(a.children[i], b.children[i])];
  }

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
