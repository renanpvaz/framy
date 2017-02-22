function VNode(tag, attributes = {}) {
  return {
    tag,
    attributes,
    id: '0',
    children: [],

    appendChild(child) {
      const id = `${this.id}.${this.children.length}`;
      const newNode = typeof child === 'string' ?
        TextVNode(child) : Object.assign(child, { id });

      this.children.push(newNode);
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
  if (a.tag !== b.tag) {
    return [{ target: a.id, type: NODE, value: b }];
  } else if(a.value !== b.value) {
    return [{ target: a.id, type: TEXT, value: b.value }];
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
      if (treeA.attributes[key] !== treeB.attributes[key]) {
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
