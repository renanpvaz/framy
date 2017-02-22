const NODE = 0;
const ATTR = 1;

function VNode(tag, attributes = {}) {
  return {
    tag,
    attributes,
    id: '0',
    children: [],

    appendChild(child) {
      const id = `${this.id}.${this.children.length}`;

      this.children.push(
        Object.assign(child, { id })
      );
    }
  }
}

function diff(a, b) {
  if (a.tag !== b.tag) {
    return [{ target: a.id, type: NODE, value: b }];
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
