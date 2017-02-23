function createElement(tree) {
  const el = document.createElement(tree.tag);

  deepAssign(el, tree.attributes);

  tree.children.forEach(
    (child, i) => el.appendChild(
      !child.tag ? createTextElement(child.value) : createElement(child)
    )
  );

  el.setAttribute('data-id', tree.id);

  return el;
}

function createTextElement(value) {
  return document.createTextNode(value);
}


function patch(patches, rootNode) {
  if (Array.isArray(patches)) {
    patches.forEach(patch => applyPatch(patch, rootNode));
  } else {
    applyPatch(patches, rootNode);
  }

  return rootNode;
}

function applyPatch(patch, rootNode) {
  const el = findTargetElement(rootNode, patch.target);

  switch (patch.type) {
    case NODE_REPLACE:
      el.parentElement.replaceChild(
        createElement(patch.value),
        el
      );
      break;
    case NODE_ADD:
      el.appendChild(
        createElement(patch.value)
      );
      break;
    case NODE_REMOVE:
      el.parentElement.removeChild(el);
      break;
    case ATTR:
      deepAssign(el, patch.value);
      break;
    case TEXT:
      el.replaceChild(
        createTextElement(patch.value),
        el.firstChild
      );
      break;
  }
}

function findTargetElement(rootNode, id) {
  if (id === '0') return rootNode;

  return rootNode.querySelector('[data-id="'+ id +'"]');
}

function update(oldTree, newTree) {
  const patches = diff(oldTree, newTree);

  store.setRoot(
    patch(patches, store.root)
  );

  return newTree;
}

function render(tree) {
  store.setRoot(createElement(tree));
  document.body.appendChild(store.root);
}
